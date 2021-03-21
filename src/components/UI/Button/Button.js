import React from 'react';


const button = (props) => {
    return(
    <button
        disabled={props.disabled}
        className={["w-max-32 w-full focus:outline-none hover:text-red-700 border-none", props.className ].join(" ")}
        onClick={props.clicked}>{props.children}</button>
)};

export default React.memo(button);