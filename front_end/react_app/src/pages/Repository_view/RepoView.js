import React,{useState,useEffect} from 'react';
import {DetailRegExpRepository,matchDetailRegExp,capitalizeFirst,getFileName,getMaxOccurances,extractMaxOccurances,getMaxPercentage,randomColor} from "../../settings";
import {useHistory} from "react-router-dom";
import {DetailRepository,UploadFile} from "../ajax/ajax";
import Header from "../components/header";
import Collapse from "./collapse";
import FilePreview from "./file_view";
import axios from 'axios';

const RepoView = () => {
    
    const token = '5234eb22a7cfd2076fc89e7ac37fe03620ed3dcc';
    const history = useHistory();

    const [user,setUser] = useState('');
    const [name,setName] = useState('');
    const [files,setFiles] = useState([]);
    const [fileURI,setFileURI] = useState('');
    const [id,setID] = useState('')

    const [maxOccurances,setMaxOccurances] = useState('');
    const [extractedOccurances,setExtractedOccurances] = useState([]);
    const [maxPercentage,setMaxPercentage] = useState('')


    const[error,setError] = useState('');


    const REGEXP = /^http:(\/)(\/)localhost:3000(\/)repositories(\/)\w+(\/)?$/
    const instructions = <div style={{"marginTop" : "10px"}}><ul><li>1 - Click the Upload button</li><li>2 - Select a file</li><li>3 - Upload it and BOOM it is uploaded</li></ul></div>

    useEffect(() => {
        const href = window.location.href;
        let isMatch = matchDetailRegExp(href,DetailRegExpRepository)
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
            let list = [];
            for (let item in x) 
            {
                list.push({"name" : getFileName(x[item][0]),"url" : `http://localhost:8000/media/${x[item][0]}`})
            }
            setFiles(list)
            
            const PROCCESSED_ARRAY = list.map(item => item.name)

            //Evaluate
            let tmp_max_occurances  = getMaxOccurances(PROCCESSED_ARRAY);
            let tmp_extracted_occurances = extractMaxOccurances(tmp_max_occurances);
            let tmp_max_percentage = getMaxPercentage(tmp_extracted_occurances);
            

            // Set the state to the evaluated values
            setMaxOccurances(tmp_extracted_occurances);
            setExtractedOccurances(tmp_extracted_occurances);
            setMaxPercentage(tmp_max_percentage);

        }
        fetchRepository();

    },[])

    const handleClick = () => {
        console.log(maxOccurances);
        console.log(extractedOccurances);
        console.log(maxPercentage);
    }


    async function handleFile()  {
        let element = document.getElementById('file');
        var formData = new FormData();
        let data = element.files[0]

        formData.append("file",data)
        formData.append("id",id)

        function sendData() {
            return axios.post('http://localhost:8000/apiconfig/files/new/',formData,{headers : {
                'Content-Type': 'multipart/form-data',
                Authorization : `Token ${token}`
            }})    
        }

        const response = await sendData();
        console.log(response)

        if(response.data.error)
        {setError(<div className="alert alert-danger" role="alert">{response.data.error}</div>
      );return () =>{}}
        
        setFiles(prev => [...prev,{name : response.data.success.name,"url" : `http://localhost:8000${response.data.success.url}`}])
        setError('')
    }

    return(
        <div>
            <Header />
            <div style={{"marginBottom" : "0"}} className="jumbotron jumbotron-fluid">
                <div  className="container">
                <div style={{textAlign : "center",marginBottom : "50px",fontSize : "50px",fontFamily : "'Russo One', sans-serif"}}>
                    Repository <b style={{"color" : "green"}}>"{name}"</b> by <b style={{"color" : "#25808e"}}>{user}</b>
                </div>
                    <div style={{"width" : "100%"}} className="progress">
                        {extractedOccurances.map(item => (<div className={`progress-bar ${item.color}`} role="progressbar" style={{width: item.precentage + "%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">{`${item.precentage}% - ${item.file == "Other" ? "Other" : `.${item.file.toUpperCase()}`}`}</div>))}
                        {/* <div className="progress-bar" role="progressbar" style={{width: "15%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">15% .PY</div>
                        <div className="progress-bar bg-success" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">30% .JS</div>
                        <div className="progress-bar bg-info" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">20% .CPP</div>
                        <div className="progress-bar bg-danger" role="progressbar" style={{width: "35%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">35% .CS</div> */}
                    </div>
                </div>
            </div>
            {error}

            <div style={{"marginTop" : "50px"}} className="container">
                <div style={{"backgroundColor" : "rgba(0,0,0,.03)",border : "3px solid rgba(0,0,0,.03)",position : "relative"}}>
                    <i style={{position : "absolute",marginTop : "4px",mariginLeft : "50px"}} className="fas fa-user"></i>
                    <div style={{"marginLeft" : "30px"}}>{user}</div>
                    <div style={{"position": "absolute",right : "2px",top : "-5px"}}>
                        <label className="btn btn-default btn-file">
                            <i className="fas fa-upload"></i><input onChange={() => handleFile()} id="file" type="file" style={{display: "none"}}></input>
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
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

        </div>
)
}


export default RepoView;