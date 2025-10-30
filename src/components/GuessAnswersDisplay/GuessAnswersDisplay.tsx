import { clsx } from "clsx";

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
    

    function createGuessBoxElements(correctItemData:itemDataStructure, currentItemData:itemDataStructure){
        const boxElements = props.labels.map((l)=> {
            const dtype = typeof(currentItemData[l]);
            let displayVal = "";
            let correctStatusClassNames = "";
            switch (dtype){
                case "number":
                    if (!(typeof(currentItemData[l]) === "number" && typeof(correctItemData) === "number")){
                        throw new Error("Expected both values to be a number")
                    }
                    
                    displayVal = String(currentItemData[l])
                    correctStatusClassNames = clsx(
                        (currentItemData[l] === correctItemData[l]) && "correct-guess-square",
                        (currentItemData[l] > correctItemData[l]) && "incorrect-high-guess-square",
                        (currentItemData[l] < correctItemData[l]) && "incorrect-low-guess-square",
                    )
                    break;

                case "string":
                    if (!(typeof(currentItemData[l]) === "string" && typeof(correctItemData[l]) === "string")){
                        throw new Error("Expected both values to be a string")
                    }
                    
                    displayVal = currentItemData[l]
                    correctStatusClassNames = clsx(
                        (currentItemData[l] === correctItemData[l]) && "correct-guess-square",
                        (currentItemData[l] !== correctItemData[l]) && "incorrect-guess-square"
                    )
                    break;

                case "object":
                    // Must handle all custom classes and arrays in this case statement with instanceof

                    // Date logic
                    if (currentItemData[l] instanceof Date){
                        if (!(currentItemData[l] instanceof Date && correctItemData[l] instanceof Date)){
                            throw new Error("Expected both values to be a Date type")
                        }
                        
                        displayVal = String(currentItemData[l].getFullYear())
                        correctStatusClassNames = clsx(
                            (currentItemData[l] === correctItemData[l]) && "correct-guess-square",
                            (currentItemData[l] !== correctItemData[l]) && "incorrect-guess-square"
                        )
                    } // Array logic
                    else if (currentItemData[l] instanceof Array){
                        if (!(currentItemData[l] instanceof Array && correctItemData[l] instanceof Array)){
                            throw new Error("Expected both values to be a Array type")
                        }

                        // String Array logic
                        if ((currentItemData[l].every((listitem) => typeof(listitem) === "string")) && correctItemData[l].every((listitem) => typeof(listitem) === "string")){
                            const currentArray = currentItemData[l] as string[]
                            const correctArray = correctItemData[l] as string[]

                            displayVal = currentItemData[l].join(", ")

                            const bAllitemsCorrect = ((currentArray.length === correctArray.length) && (correctArray.every((listItem) => currentArray.includes(listItem))))
                            const bPartiallyCorrect = (currentArray.filter((listItem) => correctArray.includes(listItem)).length > 0)
                            correctStatusClassNames = clsx(
                                bAllitemsCorrect && "correct-list-items",
                                !bAllitemsCorrect && bPartiallyCorrect && "partially-correct-list-items",
                                !bAllitemsCorrect && !bPartiallyCorrect && "incorrect-list-items"
                            )
                        } else {
                            throw new Error("Array data inconsistent or not supported yet")
                        }
                    }
                    
                    
                    else {
                        if (currentItemData[l]!.constructor.name){
                            throw new Error(`Data type ${currentItemData[l]!.constructor.name} not supported yet. Open an issue on repo`)
                        } else {
                            throw new Error("Data is empty")
                        }
                    }
                    
                    break;
            }

            return (
                <div key={String(l)} className={"guess-item-square " + correctStatusClassNames}>
                    {displayVal}
                </div>
            )
        })

        return boxElements;
    }


    const guessElements = guessedItemsData.map((item) => (
        <div key={item.championName} className="guess-item">
            {createGuessBoxElements(correctItemData, item)}
        </div>
    ))

    return(
        <section className="guess-section-container">
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