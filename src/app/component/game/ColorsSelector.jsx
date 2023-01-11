import { useState } from 'react';
import { SliderPicker } from 'react-color';

const ColorsSelector = ({color, setColor}) => {

    const handleChangeComplete = (color) => {
        console.log(color);
        setColor(color.hex);
    };

    return ( 
        <div
            style={{
                position: "fixed", 
                bottom: 50, 
                letf: 0, 
                zIndex: 9,
                width: "100%",
            }}
        >
            <SliderPicker 
                color={ color }
                onChangeComplete={ handleChangeComplete }
                onChange={ handleChangeComplete }
            />
        </div>
     );
}
 
export default ColorsSelector;