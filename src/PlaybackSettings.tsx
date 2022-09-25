import React, {Component} from 'react';

const Tempo=(props)=>{
    return(
    <div>
        <label>Tempo</label>
        <input type="number" min="30" max="240" defaultValue={props.value} onChange={props.handleTempo}/>
    </div>
    )
}

export default Tempo