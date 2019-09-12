import React from "react";

function LinkButton(props) {
    return (
        <button className={props.className} onClick={()=> window.open(props.url, "_blank")}>{props.label}</button>
        //window.open() doesn't work if AdBlock is enabled
    );
}

export default LinkButton;