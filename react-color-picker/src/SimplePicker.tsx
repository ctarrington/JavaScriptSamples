import {useCallback, useState} from "react";

import {type ColorChangeHandler, SketchPicker} from 'react-color';

import './SimplePicker.css';

interface SimplePickerProps {
    onChangeColor: (color: string) => void;
    color: string;
    recentColors: string[];
    addToRecentColors: (color: string) => void;
}

export const SimplePicker = ({onChangeColor, color, recentColors, addToRecentColors}: SimplePickerProps) => {
    const [opened, setOpened] = useState(false);

    const onClick = useCallback(() => {
        if (opened) {
            addToRecentColors(color);
        }
        setOpened(!opened);

    }, [opened, setOpened, addToRecentColors, color]);

    const onChange: ColorChangeHandler = (color) => {
        onChangeColor(color.hex);
    }

    return (
        <div className="simple-picker">
            <div className="swatch" onClick={onClick} style={{backgroundColor: color}}/>
            {opened && <SketchPicker color={color} onChange={onChange} presetColors={recentColors} disableAlpha/>}
        </div>
    );
}