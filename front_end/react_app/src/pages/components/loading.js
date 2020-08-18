import React from 'react';
import "../../App.css";

const Loading = (props) => {
    return (
        <div style={{"visibility" : props.disabled ? "visible" : "hidden","position" : "fixed","padding" : 0,margin : 0,top : 0,left : 0,width : "100%",height : "100%",backgroundColor : "rgba(77, 123, 188,0.5)"}}>
            <div style={{"position" : "fixed",left : "50%",top : "50%",animation : "1s spinning infinite linear"}} role="status">
                <i style={{"fontSize" : "80px"}} className="fas fa-fan text-primary"></i>
            </div>
        </div>
    )
}

export default Loading;