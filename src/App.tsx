
import TitleBar from "./components/TitleBar/TitleBar.tsx";
import InfoStatBox from "./components/InfoStatBox/InfoStatBox.tsx";
import DescriptionBox from "./components/DescriptionBox/DescriptionBox.tsx";
import GuessTextBox from "./components/GuessTextBox/GuessTextBox.tsx";
import GuessAnswersDisplay from "./components/GuessAnswersDisplay/GuessAnswersDisplay.tsx";

import "./App.css";



function App() {

    return(
        <main>
            <TitleBar/>
            <InfoStatBox/>
            <DescriptionBox/>
            <GuessTextBox/>
            <GuessAnswersDisplay/>
        </main>

    )
}

export default App;