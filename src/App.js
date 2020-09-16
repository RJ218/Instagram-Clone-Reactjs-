import React,{useState,useEffect} from 'react';
import './App.css';
import Post from './Post.js';
import {db} from './firebase.js';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
function getModalStyle(){
  const top=50;
  const left=505;

  return {
    top:`${top}`,
    left:`${left}`,
    transform: `translate(-${top}%, -${left}%)`
  }
}




const useStyles = makeStyles((theme) => ({
  root: {
    height: 300,
    flexGrow: 1,
    minWidth: 300,
    transform: 'translateZ(0)',
    // The position fixed scoping doesn't work in IE 11.
    // Disable this demo to preserve the others.
    '@media all and (-ms-high-contrast: none)': {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
 function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal />
    </div>
  );


function App() {

    const [posts,setPosts]= useState([]);
    const [open,setOpen]= useState(false);

    useEffect(()=>{
      db.collection('posts').onSnapshot(snapshot =>{

        setPosts(snapshot.docs.map(doc => ({
          id:doc.id,
          post:doc.data()
          })));
      })
  },[])

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      ></Modal>

      <div className="app__header">
          <img 
            className="app__headerImage"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/294px-Instagram_logo.svg.png"
            alt=""
          />
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
