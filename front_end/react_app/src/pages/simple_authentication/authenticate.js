import React, { useEffect , useState } from 'react';
import { useAuthentication } from "../ajax/isAuthenticated";
import {useHistory} from "react-router-dom";
import { makeAuthentication } from "../ajax/ajax";

const Authenticate = () => {
    const takis = useAuthentication();
    const history = useHistory();
    const [error,setError] = useState('');

    useEffect(() => {
        if(takis)
        {
            document.getElementById('close').click();
            history.push('');
        }
    },[takis])

    useEffect(() => {
        document.body.style.backgroundColor = "rgb(48, 56, 57)";
        document.getElementById("button").click();
        async function createAccount()
        {
            const response = await makeAuthentication();
            console.log(response)
        }
    },[])

    const handleSubmit = () => 
    {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        async function sendData()
        {
            const response = await makeAuthentication(username,password);
            if(response.data.error)
            {
                setError(<b style={{"color" : "red",marginLeft : "20px",marginBottom : "2px"}}>{response.data.error}</b>)
            }
            else
            {
                setError(<b style={{"color" : "green",marginLeft : "20px",marginBottom : "2px"}}>Succesfully created account for {response.data.success.username}</b>)
                localStorage.setItem("auth_key",response.data.success.token)
                document.getElementById('close').click()
                history.push("/");
                return () => {}
            }
        }
        sendData();

    }

    return (
        <div>
            <button style={{"visibility" : "hidden"}}  data-toggle="modal" data-backdrop="static" data-keyboard="false" data-target="#LoginModal" id="button"></button>
            <div className="modal fade" id="LoginModal" tabindex="-1" role="dialog" aria-labelledby="LoginModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="LoginModalLabel">Authenticate</h5>
                        <button id="close" type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                        <div className="form-group">
                            <label  for="recipient-name" className="col-form-label">Username</label>
                            <input type="text" className="form-control" id="username" ></input>
                        </div>
                        <div className="form-group">
                            <label for="message-text" className="col-form-label">Password</label>
                            <input id="password" type="password" className="form-control" ></input>
                        </div>
                        </form>
                    </div>
                    {error}
                    <div className="modal-footer">
                        <button onClick={() => handleSubmit()} style={{"width" : "100%"}} type="button" className="btn btn-success">Authenticate</button>
                        <button onClick={() => {document.getElementById('close').click();history.push('/');}} style={{"width" : "100%"}} type="button" className="btn btn-danger">Cancel</button>
                    </div>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Authenticate;