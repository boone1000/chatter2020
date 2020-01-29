import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './namePicker';
import {db, useDB} from './dp';
import { BrowserRouter, Route } from 'react-router-dom';
import { FiSend, FiCamera } from 'react-icons/fi';
// import Camera from 'react-snap-pic';

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


  return <main>

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
      {messages.map((m,i)=>{
        return <div key={i} className="message-wrap"
          from={m.name===name?'me':'you'}>
          <div className="message">
            <div className="msg-name">{m.name}</div>
            <div className="msg-text">{m.text}</div>
          </div>
        </div>
      })}
    </div>

    <TextInput onSend={(text)=> {
      db.send({
        text, name, ts: new Date(), room
      })
    }}
    sendMessage={text=> props.onSend(text)}
    showCamera={()=>setShowCamera(true)}
    />

  </main>
}

function takePicture(){
  takePicture = (img) => {
    console.log(img)
}
}

function TextInput(props){
  var [text, setText] = useState('')
  return<div className="textInput">
    <button onClick={props.showCamera}
    style={{left:10, right:'auto'}}
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
