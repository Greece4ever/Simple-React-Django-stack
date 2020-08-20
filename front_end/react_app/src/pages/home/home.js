import React,{useState,useEffect} from 'react';
import Header from "../components/header";
import Repo from "./repo";
import {ListRepository} from "../ajax/ajax";

const Home = () => {
    const [search,setSearch] = useState('');
    const [repositories,setRepositories] = useState([]);
    const [isVisible,setIsVisible] = useState("hidden");
    const loading = <div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div>
  

    useEffect(() => {
        setIsVisible("visible")
        async function fetchRepository() 
        {
            setRepositories([])
            const response = await ListRepository(search);
            let item;
            for (let data in response.data)
            {
                item = response.data[data];
                setRepositories(prev => [...prev,{id : item.id,name : item.name,description : item.description,files : item.files,user : item.user}])   
            }
            setIsVisible("hidden")

        }
        const timeout = setTimeout(() => {
            fetchRepository();
        },500)
        return () => {clearTimeout(timeout)};
    },[search])

    return (
        <div style={{"overflow": "hidden !important"}}>
            <Header />
            <div style={{"width" : "100%",height : "100%",margin : "0px","overflow": "hidden",textAlign : "center"}} className="jumbotron jumbotron-fluid">
                <div s className="container">
                    <h1 className="display-4">Browse Repositories</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
                <hr></hr>
                {search.trim() == '' ? '' : <div className="text-muted" style={{"position" : "absolute",left : "50%",transform : "translate(-50%)"}}>Showing search results for <kbd style={{"marginLeft" : "5px"}}>{search}</kbd></div>}                <i style={{"fontSize" : "200px",textAlign : "center",marginTop : "50px"}} class="fas fa-laptop-code"></i>
                <input onChange={(event) => setSearch(event.target.value)} type="search" style={{"marginTop" : "50px",maxWidth : "500px",position : 'absolute',left : "50%",transform : "translate(-50%)"}} className="form-control" placeholder="Search Repositories"></input>
                <div style={{"position" : "absolute",left : "50%",marginTop : "115px",visibility : isVisible}}>{loading}</div>
                <br></br>
                <br></br>

            </div>
            <div style={{"width" : "100%",height : "100%",margin : "0px","overflow": "hidden"}} className="jumbotron jumbotron-fluid">
                <hr></hr>
                <div className="container">
                    {repositories.length < 1 ? 'No Results found' : repositories.map(repo => (
                        <Repo name={repo.name} files={repo.files} id={repo.id} user={repo.user} />
                    ))}
                </div>
            </div>
            <div style={{"width" : "100%",height : "100%",margin : "0px","overflow": "hidden"}} className="jumbotron jumbotron-fluid">
                <div style={{"visibility" : "hidden"}} className="container">
                    <h1 className="display-4">Browse Repositories</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
            </div>
            <div style={{"width" : "100%",height : "100%",margin : "0px","overflow": "hidden"}} className="jumbotron jumbotron-fluid">
                <div style={{"visibility" : "hidden"}} className="container">
                    <h1 className="display-4">Browse Repositories</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
            </div>
        </div>
    )
}


export default Home;