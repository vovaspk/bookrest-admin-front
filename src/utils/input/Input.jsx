  
import React from 'react';
// import './input.css'

const Input = (props) => {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
               style={{borderTopLeftRadius:0, borderTopRightRadius:0}}
               className="form-control"/>
    );
};

export default Input;