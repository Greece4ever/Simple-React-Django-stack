    import React, { useEffect,useState } from 'react';
    import {fetchScript} from  "../ajax/ajax";


    const FilePreview = (props) =>
    {
        const [script,setScript] = useState('');

        useEffect(() => {
            async function fetchData() {
                const response = await fetchScript();
                console.log(response)
                setScript(<pre>'</pre>)
            }
            fetchData();
        },[props.file_name])
        
        return(
            <div>
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
                <div id="peos" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                        {script}
                        </div>
                    </div>
                </div>
            </div>

    )
}


export default FilePreview;

