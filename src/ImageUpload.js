import { Button } from '@material-ui/core';
import React,{useState} from 'react';
import {storage,db} from './firebase.js';
import firebase from 'firebase';
import './ImageUpload.css';

function ImageUpload(props) {

const [caption,setCaption] = useState('');
const [progress, setProgress] = useState(0);
const [image,setImage] = useState(null);

const handleChange=(e)=>{
    if(e.target.files[0]){
        setImage(e.target.files[0]);
    }
}

const handleupload=()=>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
        "state_changed",
        (snapshot)=>{
            const progress = Math.round(
                (snapshot.bytesTransferred/ snapshot.totalBytes)*100
            );
            setProgress(progress);
        },

        (error)=>{
            //if error occurs in uploading
            console.log(error);
            alert(error.message);
        },
        ()=>{
            //upload complete
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                    //post image in db
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        imageUrl: url,
                        username: props.username
                    });

                    setProgress(0);
                    setCaption("");
                    setImage(null);

                })
        }
    )

}

    return(
        <div className="imageupload">
            <h1>Image upload</h1>
            <progress className="progressbar" value={progress} max='100'></progress>
            <input type="text" placeholder="Enter a caption" onChange={event=> setCaption(event.target.value)} value={caption}></input>
            <input type="file" onChange={handleChange}></input>
            <Button onClick={handleupload}>Upload</Button>
        </div>
    )
}

export default ImageUpload