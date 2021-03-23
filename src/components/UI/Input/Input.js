import React from 'react';


const input = ( props ) => {
    let inputElement = null;
    let inputClasses = `outline-none focus:outline-none 
    border border-solid border-gray-200 
    bg-white focus:bg-gray-300
    py-2 px-3 
    block w-full box-border`;

    if (props.invalid) {
        inputClasses += "border-solid border-red-600 border";
    }

    switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={"w-full p-2 box-border"}>
            <label className={"font-bold block mb-2"}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;