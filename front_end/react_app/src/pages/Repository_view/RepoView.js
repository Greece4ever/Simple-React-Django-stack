import React,{useState,useEffect} from 'react';
import {DetailRegExpRepository,matchDetailRegExp,capitalizeFirst} from "../../settings";
import {useHistory} from "react-router-dom";
import {DetailRepository,UploadFile} from "../ajax/ajax";
import Header from "../components/header";
import Collapse from "./collapse";
import FilePreview from "./file_view";

const RepoView = () => {
    
    const token = '5234eb22a7cfd2076fc89e7ac37fe03620ed3dcc';
    const history = useHistory();

    const [user,setUser] = useState('');
    const [name,setName] = useState('');
    const [files,setFiles] = useState([]);
    const [fileURI,setFileURI] = useState('');
    const [id,setID] = useState('')


    const REGEXP = /^http:(\/)(\/)localhost:3000(\/)repositories(\/)\w+(\/)?$/
    const instructions = <div style={{"marginTop" : "10px"}}><ul><li>1 - Click the Upload button</li><li>2 - Select a file</li><li>3 - Upload it and BOOM it is uploaded</li></ul></div>

    useEffect(() => {
        const href = window.location.href;
        let isMatch = matchDetailRegExp(href,DetailRegExpRepository)
        console.log(isMatch)
        if(!isMatch[0]) {
            history.push('/404')
            return () => {}
        }
        setID(isMatch[0])
        async function fetchRepository() {
            const response = await DetailRepository(isMatch[1],isMatch[0],token)
            if(response.data.error) {
                switch(true)
                {
                    case response.data.error.includes('404'):
                        history.push("/404")
                        return () => {}
                    case response.data.error.includes('403'): 
                        history.push("/404")
                        return () => {}
                    default:
                        history.push('/404')
                        return () => {}
                }
            }
            setUser(capitalizeFirst(isMatch[1]))
            setName(response.data.name)
            let x = response.data.files;
            console.log(x)
            let list = [];
            for (let item in x) 
            {
                list.push({"name" :x[item][0].replace(/source-files(\/)(\w+)(\/)(\w+)(\/)(\w+)(\/)(\w+)(\/)/,''),"url" : `http://localhost:8000/media/${x[item][0]}`})
            }
            setFiles(list)
        }
        fetchRepository();

    },[])
 
    async function handleFile()  {
        let element = document.getElementById('file');
        let data = element.files[0]
        let name = data.name;
        let size = data.size;
        let text = await data.text()
        let response = await UploadFile(name,size,text,token,id)
        console.log(response)
    }

    return(
        <div>
            <Header />
            <div className="jumbotron jumbotron-fluid">
                <div style={{"textAlign" : "center"}} className="container">
                    <h1 className="display-5"><b style={{"color" : "#0f618c"}}>{user}</b>'s Repositories</h1>
                    <p style={{"marginTop" : "20px"}} className="lead"><button className="btn btn-success">View More Repositories</button></p>
                </div>
            </div>
            <div className="container">
                <div style={{"backgroundColor" : "rgba(0,0,0,.03)",border : "3px solid rgba(0,0,0,.03)",position : "relative"}}>
                    <i style={{position : "absolute",marginTop : "4px",mariginLeft : "50px"}} class="fas fa-user"></i>
                    <div style={{"marginLeft" : "30px"}}>{user}</div>
                    <div style={{"position": "absolute",right : "2px",top : "-5px"}}>
                        <label className="btn btn-default btn-file">
                            <i class="fas fa-upload"></i><input onChange={() => handleFile()} id="file" type="file" style={{display: "none"}}></input>
                        </label>
                    </div>
                </div>
                <div style={{border : "2px solid #e6e6e6",borderRadius : "1px"}}>
                    {/* <header>{name}</header> */}
                    {files.length < 1 ? instructions : files.map(item => (
                        <Collapse setFileURI={setFileURI} url={item.url} name={item.name} />
                    ))}

                </div>
                <FilePreview file_name={fileURI} />
            </div>
        </div>
    )
}


export default RepoView;