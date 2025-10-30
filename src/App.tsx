import { useState } from "react";

import TitleBar from "./components/TitleBar/TitleBar.tsx";
import InfoStatBox from "./components/InfoStatBox/InfoStatBox.tsx";
import DescriptionBox from "./components/DescriptionBox/DescriptionBox.tsx";
import GuessTextBox from "./components/GuessTextBox/GuessTextBox.tsx";
import GuessAnswersDisplay from "./components/GuessAnswersDisplay/GuessAnswersDisplay.tsx";

import "./App.css";


import { champData as rawItemData, champNames } from "./assets/champSampleData.tsx";


// Must fill this out
export interface itemDataStructure{ 
    _id?: string,
    championId?: string,
    championName: string,
    gender: string
    positions: string[],
    species: string[],
    resource: string,
    range_type: string[],
    regions: string[],
    release_date: Date
}

// fields that should not be displayed to user that are a part of the above interface (itemDataStructures)
const doNotDisplayTheseLabels = ["_id", "championId"]

function App() {
    const [answer, setAnswer] = useState<string>("Garen")
    const [guessedItems, setGuessedItems] = useState<string[]>([])
    const [itemData, setItemData] = useState<itemDataStructure[]>(() => setupItemData())
    const [displayedLabels, setDisplayedLabels] = useState<(keyof itemDataStructure)[]>(() => setupDisplayedLabels())
    

    // Custom function for setting up any data conversions, like string to Date
    function setupItemData(){
        return rawItemData.map((item) => (
            {
                ...item,
                release_date: new Date(item.release_date)
            }))
    }

    function setupDisplayedLabels(): (keyof itemDataStructure)[] {
        const labels = Object.keys(itemData[0]!) as (keyof itemDataStructure)[];
        return labels.filter((l) => !doNotDisplayTheseLabels.includes(String(l)))
    }

    function handleGuessSubmission(guess:string){
        if (champNames.includes(guess)){
            setGuessedItems((prevItems) => [...prevItems, guess])
        } else {
            console.log("item does not exist/not valid")
        }
    }

    return(
        <main>
            <TitleBar/>
            <InfoStatBox/>
            <DescriptionBox/>
            <GuessTextBox handleGuessFunction={handleGuessSubmission}/>
            <GuessAnswersDisplay correctItem={answer} guessedItems={guessedItems} itemData={itemData} labels={displayedLabels}/>
        </main>

    )
}

export default App;