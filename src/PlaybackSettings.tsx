import React, {Component} from 'react';

const Tempo=(props: { value: string | number | readonly string[] | undefined; handleTempo: (arg0: React.ChangeEvent<HTMLInputElement>) => void; })=>{
    return(
    <div>
        <label>Tempo</label>
        <input type="number" min="30" max="240" defaultValue={props.value} onChange={(value)=>props.handleTempo(value)}/>
    </div>
    )
}

export default Tempo