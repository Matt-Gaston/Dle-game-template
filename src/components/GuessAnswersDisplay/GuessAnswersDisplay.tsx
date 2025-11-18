import "./GuessAnswersDisplay.css";
import type { itemDataStructure, AnswerStatus } from "../../customTypes";
import { ANSWER_STATUS } from "../../customTypes";

interface GuessAnswersDisplayProps{
    guessedItemIndexes: number[],
    itemData: itemDataStructure[],
    labels: (keyof itemDataStructure)[],
    statusList: AnswerStatus[][],
    answerField: keyof itemDataStructure
}

function GuessAnswersDisplay(props:GuessAnswersDisplayProps) {

    function createGuessBoxElements(item_index:number, guessed_item_array_index:number){
        return props.labels.map((label, label_pos_index) => {
            // TODO: Add in classnames from answer status array
            const guess_box_status:AnswerStatus = props.statusList[guessed_item_array_index][label_pos_index]
            let guess_box_status_classname = ""
            switch (guess_box_status) {
                case ANSWER_STATUS.CORRECT:
                    guess_box_status_classname = "correct-guess-square"
                    break;
                case ANSWER_STATUS.INCORRECT:
                    guess_box_status_classname = "incorrect-guess-square"
                    break;
                case ANSWER_STATUS.PARTIALLYCORRECT:
                    guess_box_status_classname = "partially-correct-square"
                    break;
                case ANSWER_STATUS.INCORRECTLOW:
                    guess_box_status_classname = "incorrect-low-guess-square"
                    break;
                case ANSWER_STATUS.INCORRECTHIGH:
                    guess_box_status_classname = "incorrect-high-guess-square"
                    break;
                default:
                    break;
            }

            return (
                <div key={String(label)} className={"guess-item-square " + guess_box_status_classname}> 
                    {String(props.itemData[item_index][label])}
                </div>
            )
        })
    }


    const fieldLabels = props.labels.map((l) => <span key={l} className="field-labels">{l}</span>)
    
    const guessElements = props.guessedItemIndexes.map((item_index, guessed_item_array_index) => (
        <div key={String(props.itemData[item_index][props.answerField])} className="guess-item">
            {createGuessBoxElements(item_index, guessed_item_array_index)}
        </div>
    ))

    return(
        <section className="guess-section-container">
            <div className="field-labels-container">
                {props.guessedItemIndexes.length > 0 ? fieldLabels : null}
            </div>
            <div className="guess-answers-container">
                {guessElements}
            </div>
        </section>
    )
}


export default GuessAnswersDisplay;