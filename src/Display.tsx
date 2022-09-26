import React, {Component} from 'react';
import App from './App';

function arraysEqual(a,b) {
    /* WARNING: arrays must not contain {objects} or behavior may be undefined */
    if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

const DisplayHeader=()=>{
    return(
        <thead>
            <tr>
                <th>Selection</th>
                <th>Groupings</th> 
            </tr>
        </thead>
    )
}
// Want to pass handlerhythm, the rhythm table, the active rhythm, and whether or not we're playing rn.
const DisplayBody=(props)=>{
    const rows=props.rhythms.map((rhythm,index)=>{
        let str="["
        for(let i=0;i<rhythm.length;i++){
            str+=rhythm[i];
            if (i!=rhythm.length-1){
                str+=","
            }
        }
        str+="]"
        let selected="Select"
        if (arraysEqual(rhythm,props.rhythmActive)){
            selected="Selected"
        }
        
        return(
            <tr key={index}>
                <td><button disabled={props.isPlaying} onClick={()=>props.handleRhythm(rhythm)}>{selected}</button></td>
                <td>{str}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody> 
}

const Display=(props)=>{
    const {rhythms,rhythm,handleRhythm,isPlaying}=props
    return(
        <table className='table'>
        <DisplayHeader/>
        <DisplayBody rhythms={rhythms} handleRhythm={handleRhythm} rhythmActive={rhythm} isPlaying={isPlaying}/>
        </table>
    )
}

export default Display