import React from "react";

function StatusUpdate(props) {
    return (
        <span className={`report-message ${props.status}`}>
            {props.message}
        </span>
    );
}

export default StatusUpdate;