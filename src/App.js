import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  return <main>

  <header> 
    <div className="headerDiv">
      <img src="http://sweetpeafestival.org/wp-content/uploads/2012/05/sweet_pea_logo_purple.png"
        className='logo'
      />
      Talkie 
    </div>
  </header>

  <TextInput onSend={t=>console.log(t)}/>

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
      props.onSend(text)
      setText('')
      }}>
        <img src='https://cdn.shopify.com/s/files/1/1787/8943/products/ae7d93b4d28d439631850bb6248db8c3_600x.png?v=1535943790'
        className='sendArrow'/>
    </button>
  </div>
}

export default App;
