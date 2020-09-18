import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post.js';
import {db,auth} from './firebase.js';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
function getModalStyle(){
  const top=50;
  const left=50;

  return {
    top:`${top}%`,
    left:`${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  }
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
    const classes= useStyles();
    const [posts,setPosts]= useState([]);
    const [open,setOpen]= useState(false);
    const [modalStyle] = React.useState(getModalStyle);
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [email,setEmail]= useState('');
    const [user,SetUser]=useState(null)

    useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged((authUser)=>{
        if(authUser){
          console.log(authUser);
          setUsername(authUser);
        }
        else
        {
            SetUser(null);
        }
      })

      return ()=>{
          unsubscribe();

      }
    },[user,username])


    useEffect(()=>{
      db.collection('posts').onSnapshot(snapshot =>{

        setPosts(snapshot.docs.map(doc => ({
          id:doc.id,
          post:doc.data()
          })));
      })
  
    },[])

    const signup=(event)=>{
        event.preventDefault();

        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
          return authUser.user.updateProfile({
            displayName:username
          })
        })
        .catch((error)=>alert(error.message))
    }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        <center>
        <img 
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/294px-Instagram_logo.svg.png"
            alt=""
          />
        </center>
        <form className="app__signup">
        <Input
          placeholder="username"
          type="text"
          value={username}
          onChange={(e)=> setUsername(e.target.value)}
       />
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
       />
       <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
       />
       <Button type="submit" onClick={signup}>submit</Button>
       </form>
      </div>
      </Modal>

      <div className="app__header">
          <img 
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/294px-Instagram_logo.svg.png"
            alt=""
          />
        {user ? (
            <Button onClick={()=>auth.signOut()}>Logout</Button>
        ):(
          <Button onClick={()=>setOpen(true)}>Sign up</Button>
        )}
      </div>
      <h1>Lets start</h1>
     {console.log(posts)}
      {posts.map(({id,post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} ></Post>

      ))}
      <Post username="test" caption="test" imageurl="test" />
     
      {/* Header */}

      {/* Posts */}

      {/*Posts */}

    </div>
  );
}

export default App;
