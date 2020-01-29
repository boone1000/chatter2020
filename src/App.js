import React, {useState, useEffect} from 'react';
import './App.css';
import './media.css';
import NamePicker from './namePicker';
import {db, useDB} from './dp';
import { BrowserRouter, Route } from 'react-router-dom';
import { FiSend, FiCamera } from 'react-icons/fi';
import Camera from 'react-snap-pic';
import * as firebase from "firebase/app"
import "firebase/storage";

function App() {
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path='/:room' component={Room}/>
  </BrowserRouter>
}

function Room(props) {
  const {room} = props.match.params
  const [name, setName] = useState('')
  const messages = useDB(room)
  const [showCamera, setShowCamera] = useState(false) 

  async function takePicture(img) { //async means you can use "await"
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref() 
    var ref = storageRef.child(imgID + '.jpg') 
    await ref.putString(img, 'data_url')  
    db.send({ 
      img: imgID, name, ts: new Date(), room }) 
  }


  return <main>

  {showCamera && <Camera takePicture={takePicture}/>}

  <header> 
    <div className="headerDiv">
      <img src="http://sweetpeafestival.org/wp-content/uploads/2012/05/sweet_pea_logo_purple.png"
        className='logo'
      />
      Talkie 
    </div>
    <NamePicker onSave={setName}/>
  </header>

  <div className="messages">
      {messages.map((m,i)=> <Message key={i} 
        m={m} name={name} 
      />)}
    </div>

  <TextInput 
    showCamera={()=>setShowCamera(true)}
    // need () to set argument to true. but to make it not go over and 
    // over again we need to make a new function, which is why we need 
    // to use the ()=> to initialize a new function
    //never just put a new function name with parenthesis because it will loop
    onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }}
  />

  </main>
}

const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatter2020-c2802.appspot.com/o/'
const suffix = '.jpg?alt=media'

function Message({m, name}){
  return <div className="message-wrap"
    from={m.name===name?'me':'you'}
    onClick={()=>console.log(m)}>
    <div className="message">
      <div className="msg-name">{m.name}</div>
      <div className="msg-text">
        {m.text}
        {m.img && <img src={bucket + m.img + suffix} alt="pic" />}
      </div>
    </div>
  </div>
}

function TextInput(props){
  var [text, setText] = useState('')
  return<div className="textInput">
    <button onClick={props.showCamera} // when you click the button, run function props.showCamera
    style={{left:10, right:'auto'}} //
    > 
    <FiCamera style={{height:15, width:15}} /> 
    </button>
    <input className="typeBox"value={text}
      placeholder='type message here...'
      onChange={e=> setText(e.target.value)}
    />
    <button className="sendButton" onClick={()=> {
      if(text) {
        props.onSend(text)
      }
      setText('')
      }}>
        <img src='https://cdn.shopify.com/s/files/1/1787/8943/products/ae7d93b4d28d439631850bb6248db8c3_600x.png?v=1535943790'
        className='sendArrow'/>
    </button>
  </div>
}

export default App;


// npm run build
// firebase deploy
// then refresh firebase in