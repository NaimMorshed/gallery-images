import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../firebase/index';
import icon from '../../assets/upload.png';
import './Home.css';
import Card from '../Card/Card';

const Home = () => {
    const [files, setFiles] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    const [url, setUrl] = React.useState([]);
    let arr = [];

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, [])

    React.useEffect(() => {
        files.map(file => {
            const uploadTask = storage.ref(file.name).put(file);
            uploadTask.on(
                'state_changed',
                snapshot => setProgress(1),
                error => alert(error),
                () => {
                    storage
                        .ref(file.name)
                        .getDownloadURL()
                        .then(url => {
                            setProgress(2);
                            // firestore upload
                            db.collection("images")
                                .add({
                                    url: url
                                })
                                .then(() => {
                                    console.log("SUCCESS");
                                })
                                .catch((err) => {
                                    alert("Error: " + err);
                                })
                        })
                }
            )
        })
    }, [files])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
    const drop = <span className="d-flex justify-content-center"><img className="mr-1" src={icon} alt="img" />Drop</span>;
    const upload = <span className="d-flex justify-content-center"><img className="mr-1" src={icon} alt="img" />Upload</span>;

    db.collection("images")
        .get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                arr.push(doc.data().url);
            });
            setUrl(arr);
        });

    return (
        <div>
            <header className="center">
                <div className="upload-div" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? drop : upload}
                </div>
            </header>
            <main>
                <h1>Total images: {url.length}</h1>
                {progress === 1 ? "Uploading" : progress === 2 ? "Complete" : ''}
                {
                    url.map(
                        imgUrl => <Card props={imgUrl} />
                    )
                }
            </main>
        </div>
    );
};

export default Home;