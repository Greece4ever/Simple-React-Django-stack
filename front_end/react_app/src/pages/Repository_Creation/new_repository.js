import React,{useState, useEffect} from 'react';
import Header from '../components/header';
import {createRepository,checkRepositoryNameAvailability} from "../ajax/ajax";
import Loading from "../components/loading";
import Alert from '../components/alert';
import { useHistory } from 'react-router-dom';

const RepositoryCreate = () => {

    const [token,setToken] = useState(localStorage.getItem("auth_key"))
    
    const [disabled,setDisabled] = useState(false)
    const [msg,setMSG] = useState(['',''])
    const [readOnly,setReadOnly] = useState(false)
    const [typing,setTyping] = useState('')
    const [availabe,setAvailabe] = useState('')
    const [isDisabled,setIsDisabled] = useState(false);

    const history = useHistory();
    const handleSubmit = (event) => {
        event.preventDefault();

        //fetch Data
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;


        let dsa = document.getElementById('check').checked;

        async function handleAjax() {
            setDisabled(true)
            const response = await createRepository(name,description,token,dsa);

            if (response.data.error) {
                setMSG([response.data.error,'danger'])
            }
            else {
                setMSG([`Successfuly created ${response.data.success.private ? 'Private' : 'Public'} repository "${response.data.success.name}"!`,'success'])
                setReadOnly(true)
                const user = response.data.success.user;
                const id = response.data.success.id;
                setTimeout(() => {
                    history.push(`/repository/${user}/${id}`)
                    return () => {}
                },1000)

            }
            setDisabled(false)
        }
        handleAjax();
        
    }

    useEffect(() => {
        if(!token) {
            history.push("/accounts/auth")
            return () => {}
        }
    },[token])

    useEffect(() => {
        async function checkIsAvailable() {
            const response =  await checkRepositoryNameAvailability(typing,token)
            if(response.data.error) 
            {
                setAvailabe(prev => <b className="text-danger" style={{"marginLeft" : "9px"}}>(Taken)</b>)
                setIsDisabled(true);
            }
            else if (typing == '') {
                setIsDisabled(true);
            }
            else {
                setAvailabe(prev => <b className="text-success" style={{"marginLeft" : "9px"}}>(Availabe)</b>)
                setIsDisabled(false);

            }
        }
        const timeout = setTimeout(() => {
            checkIsAvailable();
        },1000)
        return () => clearTimeout(timeout)
    },[typing])

    return(
        <div>
            <Header />
            <Loading disabled={disabled} />
            <Alert message={msg[0]} type={msg[1]} />
            <div style={{"marginTop" : "50px"}} className="container">
                <form className="container">
                    <div className="form-group">
                        <label style={{"fontWeight" : "500"}} for="exampleInputEmail1">Name <span>{availabe}</span></label>
                        <input onChange={(event) => setTyping(event.target.value)} maxlength="100" type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Something small" readOnly={readOnly}></input>
                        <small id="emailHelp" className="form-text text-muted">Must be unique among your repositories.</small>
                    </div>
                    <div className="form-group">
                        <label style={{"fontWeight" : "500"}} for="exampleInputPassword1">Description</label>
                        <textarea maxlength="500" style={{"maxHeight" : "250px",minHeight : "110px"}} className="form-control" id="description" placeholder="Describe your project" readOnly={readOnly}></textarea>
                        <small id="emailHelp" className="form-text text-muted">Describing your repository will help in making it appear in search results.</small>
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="check" disabled={disabled}></input>
                        <label style={{"position" : ''}} className="form-check-label" for="exampleCheck1"><i className="fas fa-user-lock"></i><span style={{"marginLeft" : "10px"}}>Private</span></label>
                    </div>
                    <div style={{"marginTop" : "10px"}}>
                        <button onClick={(event) => handleSubmit(event)} type="submit" className="btn btn-primary" disabled={isDisabled}>Submit</button>
                        <button style={{"marginLeft" : "20px"}} type="submit" className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RepositoryCreate;