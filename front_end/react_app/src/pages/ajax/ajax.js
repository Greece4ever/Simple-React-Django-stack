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