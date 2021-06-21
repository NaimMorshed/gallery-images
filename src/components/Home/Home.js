import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage, db } from '../../firebase/index';
import icon from '../../assets/upload.png';
import './Home.css';
import Card from '../Card/Card';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({ backdrop: { zIndex: theme.zIndex.drawer + 1, color: '#fff', }, }));

const Home = () => {
    const [files, setFiles] = React.useState([]);
    const [url, setUrl] = React.useState([]);
    const [message, setMessage] = React.useState("Please wait");
    let array = [];
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, [])

    React.useEffect(() => {
        // eslint-disable-next-line array-callback-return
        files.map(file => {
            const uploadTask = storage.ref(file.name).put(file);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    setMessage("Uploading: "
                        + (Math.floor(snapshot.bytesTransferred / 1024))
                        + "kb / " + (Math.floor(snapshot.totalBytes / 1024))
                        + "kb");
                    setOpen(true)
                },
                error => alert(error),
                () => {
                    storage
                        .ref(file.name)
                        .getDownloadURL()
                        .then(url => {
                            setMessage("Please wait");

                            db.collection("images")
                                .add({
                                    url: url
                                })
                                .then(() => {
                                    setOpen(false);
                                })
                                .catch((err) => {
                                    alert("Error: " + err);
                                    setOpen(false);
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
                array.push(doc.data().url);
            });
            setUrl(array);
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
                <div className="center top-div">
                    <span>Images: {url.length}</span>
                </div>
                <div className="image-container">
                    {
                        url.map(
                            imgUrl => <Card props={imgUrl} />
                        )
                    }
                </div>
            </main>
            <div>
                <Backdrop className={classes.backdrop} open={open}>
                    <div className="center-col">
                        <CircularProgress color="inherit" />
                        <h5 className="mt-2">{message}</h5>
                    </div>
                </Backdrop>
            </div>
        </div>
    );
};

export default Home;