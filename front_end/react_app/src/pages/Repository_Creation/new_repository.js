import React,{useState, useEffect} from 'react';
import Header from '../components/header';
import {createRepository,checkRepositoryNameAvailability} from "../ajax/ajax";
import Loading from "../components/loading";
import Alert from '../components/alert';
import { useHistory } from 'react-router-dom';

const RepositoryCreate = () => {

    const token = '5234eb22a7cfd2076fc89e7ac37fe03620ed3dcc'
    
    const [disabled,setDisabled] = useState(false)
    const [msg,setMSG] = useState(['',''])
    const [readOnly,setReadOnly] = useState(false)
    const [typing,setTyping] = useState('')
    const [availabe,setAvailabe] = useState('')

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
                console.log(response.data)
                setMSG([`Successfuly created ${response.data.success.private ? 'Private' : 'Public'} repository "${response.data.success.name}"!`,'success'])
                setReadOnly(true)
                setTimeout(() => {
                    history.push('/')
                },1000)

            }
            setDisabled(false)
        }
        handleAjax();
        
    }


    useEffect(() => {
        async function checkIsAvailable() {
            const response =  await checkRepositoryNameAvailability(typing,'token')
            console.log(response)
        }
        const timeout = setTimeout(() => {
            checkIsAvailable();
        },1000)
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
                        <button onClick={(event) => handleSubmit(event)} type="submit" className="btn btn-primary">Submit</button>
                        <button style={{"marginLeft" : "20px"}} type="submit" className="btn btn-danger">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RepositoryCreate;