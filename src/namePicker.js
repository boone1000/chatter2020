import React, {useState} from 'react';
import { FiEdit, FiSave } from 'react-icons/fi';

function NamePicker(props) {
    const[showName, setShowName] = useState(false)
    const[name, setName] = useState('')

    return <div className='login'>
        <input className='inputName'
            value={name} 
            placeholder='Set Username'
            style={{display: showName ? 'none' : 'flex'}}
            onChange={e=> setName(e.target.value)}
            onKeyPress={e=>{
                if (e.key==='Enter') props.onSave(name)
            }}>
        </input>

        {showName && <div>{name}</div>}

        <button className='submitName'
            onClick={()=>{
                if(name) props.onSave(name)
                setShowName(!showName) /*this makes it toggle */
            }}>
            {showName ? <FiEdit/> : <FiSave />}
        </button>
    </div>
}
export default NamePicker 