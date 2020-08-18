import React from 'react';

const Alert = (props) => {
    return (
        <div style={{"borderRadius" : 0}} class={`alert alert-${props.type}`} role="alert">
            {props.message}
        </div>
    )
}


export default Alert;