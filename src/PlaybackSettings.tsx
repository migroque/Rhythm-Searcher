import React, {Component} from 'react';

const Tempo=(props)=>{
    return(
    <div>
        <input type="number" min="30" max="240" value={props.value} onChange={props.handleTempo}/>
    </div>
    )
}

export default Tempo