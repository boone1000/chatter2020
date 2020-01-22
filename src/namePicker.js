import React, {useState} from 'react';

function NamePicker(username) {
    const[editName, setEditName] = useState(false)
    const[name, setName] = useState('')

    return <div className='login'>
        <input className='inputName'
            value={name} 
            placeholder='Set Username'
            onChange={e=> setName(e.target.value)}>
        </input>
        <button className='submitName'
            onClick={()=>{
                username.onSend(name)
                setName('')
            }}>
            OK
        </button>
    </div>
}
export default NamePicker 