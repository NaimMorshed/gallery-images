import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
//import { storage } from '../../firebase/index';
import icon from '../../assets/upload.png';
import './Home.css';

const Home = () => {
    const [files, setFiles] = React.useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, [])

    const funcUpload = () => {
        console.log(files.length);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const drop = <span className="d-flex justify-content-center"><img className="mr-1" src={icon} alt="img" />Drop</span>;
    const upload = <span className="d-flex justify-content-center"><img className="mr-1" src={icon} alt="img" />Upload</span>;

    return (
        <div>
            <header className="center">
                <div className="upload-div" {...getRootProps()}>
                    <input {...getInputProps()} />
                    { isDragActive ? drop: upload }
                </div>
            </header>
            <main>
                <h1>{ files.length }</h1>
                { files.length === 0 || funcUpload() }
            </main>
        </div>
    );
};

export default Home;