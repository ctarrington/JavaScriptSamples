import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {SimplePicker} from "./SimplePicker.tsx";

function updateColors(colors: string[], color: string) {
    if (!colors.includes(color)) {
        colors.unshift(color);
        if (colors.length > 10) {
            colors.pop();
        }
    }
}

function App() {
    const [color, setColor] = useState("#ff0000");
    const [background, setBackground] = useState("#00ff00");
    const [recentColors, setRecentColors] = useState<string[]>([]);
    const localStorageKey = 'my-recent-colors';

    useEffect(() => {
        const storedColors = localStorage.getItem(localStorageKey);
        if (storedColors) {
            try {
                const parsedColors = JSON.parse(storedColors);
                if (Array.isArray(parsedColors)) {
                    setRecentColors(parsedColors);
                }
            } catch (e) {
                console.error("Failed to parse stored colors:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (recentColors.length > 0) {
            localStorage.setItem(localStorageKey, JSON.stringify(recentColors));
        }
    }, [recentColors])

    const onChange = (color: string) => {
        setColor(color);
        console.log(color);
    };

    const onChangeBackground = (color: string) => {
        setBackground(color);
        console.log(color);
    }

    const addToRecentColors = useCallback((color: string) => {
        const modifiedColors = [...recentColors];
        updateColors(modifiedColors, color);
        setRecentColors(modifiedColors);
    }, [recentColors, setRecentColors]);

    return (
        <>
            <div>
                <div>{color}</div>
                <SimplePicker onChangeColor={onChange} color={color} recentColors={recentColors}
                              addToRecentColors={addToRecentColors}/>
                <div>{background}</div>
                <SimplePicker onChangeColor={onChangeBackground} color={background} recentColors={recentColors}
                              addToRecentColors={addToRecentColors}/>
            </div>
        </>
    )
}

export default App
