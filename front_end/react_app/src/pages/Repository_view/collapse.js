import React from 'react';


const Collapse = (props) => {
    return(
        <div data-toggle="modal" data-target="#peos" onClick={() => {props.setFileURI(props.url)}} style={{"border" : "0"}} id="accordion">
            <div style={{"border" : "0"}} className="card">
                <div style={{"borderRadius" : "0",MozBoxShadow : "none",height : "10px"}} className="card-header" id="headingOne">
                <h5 className="mb-0">
                    <i style={{position : "absolute","color" : "#333",bottom : "5px",left : "10px",fontSize : "15px"}} className="fas fa-file-alt"></i>
                    <a style={{position : "absolute","fontSize" : "17px",bottom : "5px",left : "35px",textDecoration : "none"}} className="text-muted" href="#">{props.name}</a>
                    <label style={{position : "absolute","right" : "10px",fontSize : "15px",top : "2px"}} className="text-muted">2020-12-1</label>
                </h5>
                </div>
            </div>
        </div>

    )
}


export default Collapse;