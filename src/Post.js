import React,{useState} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar";

function Post(props){
    

    return(
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={props.username}
                    src=""    
                />
             <h3>{props.username}</h3>
            </div>


           
            {/* header*/ }
        <img className="post__image"
            src={props.imageUrl}
            alt=""
        ></img>
            {/* image */}

        <h3 className="post__text"><strong>{props.username}: </strong> {props.caption}</h3>

            {/* username+caption */}
        </div>
    )
}
export default Post;