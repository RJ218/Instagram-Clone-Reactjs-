import React,{useEffect, useState} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
import firebase from 'firebase';

function Post({postId, user ,username,imageUrl,caption}){
    
    const [comments,setComments] = useState([]);
    const [comment,setComment]= useState('');
   // console.log('user='+props.user.displayName);
    useEffect(()=>{
        console.log('post id is' + postId)
        let unsubscibe;
        if(postId)
        {
            unsubscibe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('Timestamp','desc')
            .onSnapshot((snapshot)=>{
                setComments(snapshot.docs.map((doc)=>doc.data()))
                
            })
        }

        return ()=>{
            unsubscibe();
        };

    },[postId])


    const postComment=(event)=>{

        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setComment('');
    }

    //console.log('comments= '+comments)

    return(
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src=""    
                />
             <h3>{username}</h3>
            </div>


           
            {/* header*/ }
        <img className="post__image"
            src={imageUrl}
            alt=""
        ></img>
            {/* image */}

        <h3 className="post__text"><strong>{username}: </strong> {caption}</h3>
        <div className="post__comments">
            {
                comments.map((comment)=>(
                    <p>
                        <strong>{comment.username}</strong> {comment.text}
                    </p>
                ))
            }
        </div>


        <form className="post__commentBox">
            <input
             className="post__input"
             type="text"
             placeholder="Add a comment"
             value={comment}
             onChange={(e)=> setComment(e.target.value)}
                >
            </input>
            <button
                className="post__button"
                disabled={!comment}
                type="submit"
                onClick={postComment}
            >Post

            </button>
        </form>

            {/* username+caption */}
        </div>
    )
}
export default Post;