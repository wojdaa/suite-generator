import React from "react";

function LinkButton(props) {
    return (
        <button className={props.className} onClick={() => window.open(props.url, "_blank")}>{props.label}</button>
    );
}

export default LinkButton;