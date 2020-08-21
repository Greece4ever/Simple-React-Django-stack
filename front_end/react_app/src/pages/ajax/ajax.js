import axios from 'axios';
import {PATH} from "../../settings";

export const createRepository = (name,description,token,isPrivate) => {
    const target = PATH.join('apiconfig','repositories','new/');

    return axios.post(target,{
        name : name,
        description : description,
        private : isPrivate
    },{
        headers : {
            Authorization : `Token ${token}`
        }
    })

}

export const checkRepositoryNameAvailability = (name,token) => 
{
    const target = PATH.join('apiconfig','repositories','new/');
    return axios.get(`${target}?name=${name}`,{headers : {Authorization : `Token ${token}`}});
}

export const DetailRepository = (user,id,token)                                       => {
    let target = `http://localhost:8000/apiconfig/repositories/view/?id=${id}&user=${user}`
    return axios.get(target,{headers: {Authorization : `Token ${token}`}})
                                                                                            }                                                           


export const UploadFile = (name,size,data,token,id) => {
    return axios.post('http://localhost:8000/apiconfig/files/new/',{
        id : id,
        name : name,
        size : size,
        data : data
    },
    {
        headers: { Authorization : `Token ${token}` }
    }
    );
}

export const ListRepository = (search=null) => {
    return axios.get(`http://localhost:8000/apiconfig/repositories/list/${!search ? '' : `?search=${search}`}`)
}


export const checkAuthentication = (token=null) => {
    return axios.get('http://localhost:8000/apiconfig/accounts/is_authenticated/',{
        Authorization : `Token ${token}`
    });
}

export const makeAuthentication = (username,password) => {
    return axios.post('http://localhost:8000/apiconfig/accounts/ViewOrCreate/',{
        username : username,
        password : password
    })
}