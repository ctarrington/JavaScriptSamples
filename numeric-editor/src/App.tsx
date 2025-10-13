import {useState} from 'react'
import './App.css'
import {NumericInput} from "./NumericInput.tsx";

function App() {
    const [numericValue, setNumericValue] = useState(0);

    return (
        <div>
            <NumericInput min={0} max={100} precision={2} currentValue={numericValue}
                          onChange={(value) => setNumericValue(value)}/>
            <div>Numeric value: {numericValue}</div>
        </div>
    )
}

export default App
