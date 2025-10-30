

import "./GuessAnswersDisplay.css";
import type { itemDataStructure } from "../../App";

interface GuessAnswersDisplayProps{
    correctItem:string,
    guessedItems: string[],
    itemData: itemDataStructure[],
    labels: (keyof itemDataStructure)[]
}

function GuessAnswersDisplay(props:GuessAnswersDisplayProps) {
    const correctItemData = props.itemData.find((item) => item.championName === props.correctItem)!;
    const guessedItemsData = props.guessedItems.map((itemName) => props.itemData.find((item) => item.championName === itemName)!)//.filter((i) => i !== undefined)

    const fieldLabels = props.labels.map((l) => <span key={l} className="field-labels">{l}</span>)
    
    function createGuessBoxElements(correctItemData:itemDataStructure, guessedItemsData:itemDataStructure[], currentItem:itemDataStructure){
        const boxElements = props.labels.map((l)=> (
            <div key={String(l)} className="guess-item-square">
                {String(currentItem[l])}
            </div>
        ))

        return boxElements;
    }


    const guessElements = guessedItemsData.map((item) => (
        <div key={item.championName} className="guess-item">
            {createGuessBoxElements(correctItemData, guessedItemsData, item)}
        </div>
    ))

    return(
        <section>
            <div className="field-labels-container">
                {props.guessedItems.length > 0 ? fieldLabels : null}
            </div>
            <div className="guess-answers-container">
                {guessElements}
            </div>
        </section>
    )
}


export default GuessAnswersDisplay;