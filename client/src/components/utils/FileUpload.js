import React, {useState} from "react";
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from "axios";

function FileUpload() {

    // many images so that use intial state as an Array
    // also we need to add this state to the parent component to send in the same form

    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append('file', files[0])

        // save the Image we chose inside the Node Server
        axios.post('/api/product/image', formData, config)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    alert('Failed to save the Image in Server');
                }
            })
    }


    return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <div style={{
                        width: '300px',
                        height: '240px',
                        border: '1px solid lightgray',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                         {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{fontSize: '3rem'}}/>
                    </div>
                )}
            </Dropzone>

            <div style={{display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
              
            </div>
        </div>
    );
};

export default FileUpload;