import { clsx } from "clsx";

import { useState } from "react";

import TitleBar from "./components/TitleBar/TitleBar.tsx";
import InfoStatBox from "./components/InfoStatBox/InfoStatBox.tsx";
import DescriptionBox from "./components/DescriptionBox/DescriptionBox.tsx";
import GuessTextBox from "./components/GuessTextBox/GuessTextBox.tsx";
import GuessAnswersDisplay from "./components/GuessAnswersDisplay/GuessAnswersDisplay.tsx";
import GameOverDisplay from "./components/GameOverDisplay/GameOverDisplay.tsx";
import GameSummary from "./components/GameSummary/GameSummary.tsx";

import "./App.css";


import { champData as rawItemData } from "./assets/champSampleData.tsx";

// ####################################################
// MUST FILL OUT THIS SECTION FOR YOUR DATA ----


// Must fill this out for your custom data to be used
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
    release_date: number
}

// fields that should not be displayed to user that are a part of the above interface (itemDataStructures)
const doNotDisplayTheseLabels = ["_id", "championId"]

// The field that is treated as the answer/guess
const answer_field = "championName"


// END OF CUSTOM DATA SECTION
// ####################################################


export const ANSWER_STATUS = {
    CORRECT: 0,
    INCORRECT: 1,
    PARTIALLYCORRECT: 2,
    INCORRECTLOW: 3,
    INCORRECTHIGH: 4
} as const

export type AnswerStatus = typeof ANSWER_STATUS[keyof typeof ANSWER_STATUS]


// -----------------------------------------------
// Functionality for setting up data


// Custom function for setting up any data conversions, like string to Date
function setupItemData(){
    return rawItemData.map((item) => (
        {
            ...item,
            release_date: new Date(item.release_date).getFullYear()
        }))
}

function setupAnswerItems(){
    return itemData.map((itemObject) => itemObject[answer_field])
}

function setupDisplayedLabels(): (keyof itemDataStructure)[] {
    const labels = Object.keys(itemData[0]!) as (keyof itemDataStructure)[];
    return labels.filter((l) => !doNotDisplayTheseLabels.includes(String(l)))
}

const itemData = setupItemData()
const answerItems = setupAnswerItems()
const displayedLabels = setupDisplayedLabels()
const answerIndex = 38

// -----------------------------------------------



function App() {
    const [guessedItemIndexes, setguessedItemIndexes] = useState<number[]>([])

    // -----------------------------------------------
    // Functionality for guess statuses and game won logic

    
    let bGameWon = false
    if (answerIndex === guessedItemIndexes[0]){
        bGameWon = true
    }

    const guessStatusList: AnswerStatus[][] = guessedItemIndexes.map((guessIndex) => {
        // for each guess index
        const currentItemData = itemData[guessIndex]
        const correctItemData = itemData[answerIndex]

        return displayedLabels.map((label) => {
            const dtype = typeof(itemData[guessIndex][label])
            const currentItemDataSelected = currentItemData[label]!
            const correctItemDataSelected = correctItemData[label]!
            switch (dtype){
                case "number":                    
                    if (currentItemData[label] === correctItemData[label]) { return ANSWER_STATUS.CORRECT }
                    else if (currentItemDataSelected > correctItemDataSelected) { return ANSWER_STATUS.INCORRECTHIGH }
                    else if (currentItemDataSelected < correctItemDataSelected) { return ANSWER_STATUS.INCORRECTLOW }

                    break;

                case "string":
                    if (currentItemDataSelected === correctItemDataSelected) { return ANSWER_STATUS.CORRECT }
                    else if (currentItemDataSelected !== correctItemDataSelected) { return ANSWER_STATUS.INCORRECT }

                    break;

                case "object":
                    // Must handle all custom classes and arrays in this case statement with instanceof

                    // Date logic -- not needed, converted to numbers
                    if (currentItemDataSelected instanceof Date && correctItemDataSelected instanceof Date){                        
                        if (currentItemDataSelected === correctItemDataSelected) { return ANSWER_STATUS.CORRECT }
                        else if (currentItemDataSelected !== correctItemDataSelected) { return ANSWER_STATUS.INCORRECT }
                        
                    } 
                    // Array logic
                    else if (currentItemDataSelected instanceof Array && correctItemDataSelected instanceof Array){

                        // String Array logic
                        if ((currentItemDataSelected.every((listitem) => typeof(listitem) === "string")) && correctItemDataSelected.every((listitem) => typeof(listitem) === "string")){
                            const currentArray = currentItemDataSelected as string[]
                            const correctArray = correctItemDataSelected as string[]

                            const bAllitemsCorrect = ((currentArray.length === correctArray.length) && (correctArray.every((listItem) => currentArray.includes(listItem))))
                            const bPartiallyCorrect = (currentArray.filter((listItem) => correctArray.includes(listItem)).length > 0)
                            if (bAllitemsCorrect) { return ANSWER_STATUS.CORRECT }
                            else if (!bAllitemsCorrect && bPartiallyCorrect) { return ANSWER_STATUS.PARTIALLYCORRECT }
                            else if (!bAllitemsCorrect && !bPartiallyCorrect) { return ANSWER_STATUS.INCORRECT }
                        } else {
                            throw new Error("Array data inconsistent or not supported yet")
                        }
                    }
                    else {
                        if (currentItemDataSelected!.constructor.name){
                            throw new Error(`Data type ${currentItemDataSelected!.constructor.name} not supported yet. Open an issue on repo`)
                        } else {
                            throw new Error("Data is empty")
                        }
                    }
                    break;
            }
            throw new Error("Somehow hit this jkfld;sajfkl. Good job, happy debugging")
        })
    })

    // -----------------------------------------------


    // -----------------------------------------------
    // Guessing functionality handling

    function handleGuessSubmission(guess:string){
        if (answerItems.includes(guess)){
            const guess_index = itemData.findIndex((item) => item[answer_field] === guess)
            setguessedItemIndexes((prevItems) => [guess_index, ...prevItems])
        } else {
            console.log("item does not exist/not valid")
        }
    }

    // -----------------------------------------------


    return(
        <main>
            <TitleBar/>
            <InfoStatBox/>
            <DescriptionBox/>
            { bGameWon ? null : <GuessTextBox handleGuessFunction={handleGuessSubmission}/> }
            <GuessAnswersDisplay guessedItemIndexes={guessedItemIndexes} itemData={itemData} labels={displayedLabels} statusList={guessStatusList} answerField={answer_field}/>
            <GameOverDisplay/>
            <GameSummary/>
        </main>

    )
}

export default App;