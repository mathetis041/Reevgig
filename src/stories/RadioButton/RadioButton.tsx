import React from "react";
import style from "./radiobutton.module.css";

interface RadioProps {
    name: string;
    value: string;
    selectedValue: string;
    onChange: (value: string) => void;
    borderRadius?: string;
    border?: string;
    padding?: string;
    width?: string;
    height?: string;
    backgroundColor?: string;
    color?: string;
    display?: string;
    justifyContent?: string;
    alignItems?: string;
    gap?: string;
    enableSelectedStyles?: boolean;
    id?: string;
    subHead?: string;
    styleP?: boolean;
}

const RadioButton: React.FC<RadioProps> = ({
                                               styleP,

                                               subHead,
                                               id,
                                               name,
                                               value,
                                               selectedValue,
                                               onChange,
                                               borderRadius,
                                               border,
                                               padding,
                                               width,
                                               height,
                                               backgroundColor,
                                               color,
                                               display,
                                               justifyContent,
                                               alignItems,
                                               gap,
                                               enableSelectedStyles = false,
                                               ...rest
                                           }) => {
    const handleChange = () => {
        if (value === selectedValue) {
            onChange("");
        } else {
            onChange(value);
        }
    };

    const isSelected = selectedValue === value;

    const appliedBackgroundColor =
        enableSelectedStyles && isSelected ? "#272727" : "#fff";

    const appliedColor =
        enableSelectedStyles && isSelected ? "#FFFFFF" : "#545A62";

    return (
        <>
            <label
                style={{
                    borderRadius,
                    border,
                    padding,
                    width,
                    height,
                    display,
                    gap,
                    justifyContent,
                    alignItems,
                    backgroundColor: appliedBackgroundColor,
                    cursor: 'pointer'
                }}
                className={style.radiobtn}>
                <div>
                    <input
                        id={id}
                        className={style.input}
                        style={{border: border}}
                        type="radio"
                        name={id}
                        value={value}
                        checked={selectedValue === value}
                        onChange={handleChange}
                    />
                    <div className={style.checkmark}>{subHead}</div>
                </div>
                <p style={{color: appliedColor, width: styleP ? '131px' : ''}} className={style.value}>
                    {value}
                </p>
            </label>
        </>
    );
};

export default RadioButton;
