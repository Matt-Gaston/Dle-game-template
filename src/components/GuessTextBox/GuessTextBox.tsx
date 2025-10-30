import { useState } from "react";

import "./GuessTextBox.css";

interface GuessTextBoxProps{
    handleGuessFunction: (guess:string) => void
}

function GuessTextBox(props:GuessTextBoxProps) {
    const [input, setInput] = useState<string>("");

    function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        props.handleGuessFunction(input)
        setInput("");
    }

    return(
        <form onSubmit={handleSubmit}>
            <input 
                value={input}
                onChange={(event) => setInput(event.target.value)}
                type="text"
                name="guessBox"
                placeholder="Enter your guess"
            />
            <button>Guess</button>
        </form>
    )
}


export default GuessTextBox;