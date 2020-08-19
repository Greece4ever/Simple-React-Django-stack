import React,{useState,useEffect} from 'react';
import {matchDetailRegExp} from "../../settings";
import {DetailRepository} from "../ajax/ajax";
import axios from 'axios';
// import Prism from 'prismjs';


const RepoViewDetail = () => {

    const token = "5234eb22a7cfd2076fc89e7ac37fe03620ed3dcc";

    // let html = Prism.highlight(`var f = 3;`,Prism.languages['javascript'])

    const [user,setUser] = useState('');
    const [name,setName] = useState('')
    const REGEXP = /^http:(\/)(\/)localhost:3000(\/)repository(\/)(\w+)(\/)(\w+)(\/)?$/
    const [code,setCode] = useState('')

    // useEffect(() => {
    //     let href = window.location.href;
    //     let x = matchDetailRegExp();
    //     if (!x[0]) return () => {console.log("NOT FOUND")}
    //     async function fetchRepository() {
    //         const response = await DetailRepository(x[1],x[0]);
    //     }
    // },[])

    var x = () => {
        return axios.get('http://localhost:8000/media/source-files/users/1/repositories/undefined/functions.js')
    }

    useEffect(() => {
        async function f() {
            let response = await x();
            console.log(response)
            setCode(<pre style={{"height" : "500px",resize : "vertical"}} className="language-markup"><code> {response.data}</code></pre>)
        }
        f();
    },[])
 
    return(
        <div className="container">
            <div className="container">
                {code}
            </div>
        </div>
        )
}


export default RepoViewDetail;