import React from 'react';

const Repo = (props) => {
    return(
        <div>
        <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">

                <a href={`/repository/${props.user}/${props.id}`} style={{"textDecoration" : "none",color : "#333",cursor: "pointer"}}>
                <i class="fab fa-git-alt"></i>
                <label style={{"marginLeft" : "10px",cursor : "pointer"}}>{props.name}</label>
                </a>
                <div style={{"position": "absolute",right : "20px",bottom : "15px"}}>
                    <b style={{"marginRight" : "10px"}}>{props.files}</b>
                    <i class="fas fa-code-branch"></i>
                </div>
            </h5>
            </div>
            </div>
            </div>
        
        </div>
    )
}

export default Repo;