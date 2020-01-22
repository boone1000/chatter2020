import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import NamePicker from './namePicker.js'


function App() {
  const [messages, setMessages] = useState([])
  const [userName, setName] = useState('')
  console.log(messages)
  return <main>

  <header> 
    <div className="headerDiv">
      <img src="http://sweetpeafestival.org/wp-content/uploads/2012/05/sweet_pea_logo_purple.png"
        className='logo'
      />
      Talkie 
    </div>
    <NamePicker onSend={(userName)=>{setName()}}/>
  </header>

  <div className="allMessages">
    {/* messages */}
    {messages.map((m,i)=>{
    return<div key={i} className='message'>{m}</div>
    })}
  </div>

  <TextInput onSend={(text)=>{setMessages([text, ...messages])}}/>

  </main>
}

function TextInput(props){
  var [text, setText] = useState('')
  return<div className="textInput">
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
