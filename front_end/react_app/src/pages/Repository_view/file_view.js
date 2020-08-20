import React, { useEffect,useState } from 'react';
import {fetchScript} from  "../ajax/ajax";
import axios from 'axios';

const IMAGE_FORMATS = [
    "JPEG", 
    "JPG",
    "PNG", 
    "GIF", 
    "TIFF", 
    "PSD", 
    "EPS", 
    "AI",
    "INDD", 
    "ICO",
    "RAW",
]

const doNotUseScript = (url) => {
    return axios.get(url);
}


    const FilePreview = (props) =>
    {
        const [script,setScript] = useState('');


        useEffect(() => {
            async function fetchData() {
                const response = await doNotUseScript(props.file_name);
                let tmp = props.file_name.split('.');
                tmp = tmp[tmp.length-1].toUpperCase();
                let status = false;
                for (let format in IMAGE_FORMATS)
                {
                    if(IMAGE_FORMATS[format] == tmp)
                    {
                        status = true;
                    }
                }
                if (!status) {
                    setScript(<pre className="language-markdown"><code className="language-markdown">{response.data}</code></pre>)
                    return () => {}
                }
                else
                {
                    setScript(<embed style={{"maxWidth" : "500px"}} src={props.file_name}></embed>)
                }
            }
            fetchData();
        },[props.file_name])
        
        return(
            <div    >
                <div id="peos" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div style={{"textAlign" : "center"}}>
                                {script}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    )
}


export default FilePreview;

