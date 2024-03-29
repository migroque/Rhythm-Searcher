import React, {Component} from 'react';

function arraysEqual(a: string | any[] | null,b: string | any[] | null) {
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
const DisplayBody=(props: { rhythms: any[]; rhythmActive: string | any[] | null; isPlaying: boolean | undefined; handleRhythm: (arg0: any) => void; })=>{

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
        let className='btn btn-outline-primary'
        if (arraysEqual(rhythm,props.rhythmActive)){
            selected="Selected"
            className='btn btn-primary'
        }
        
        
        return(
            <tr key={index}>
                <td><button disabled={props.isPlaying} className={className} onClick={()=>props.handleRhythm(rhythm)}>{selected}</button></td>
                <td>{str}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody> 
}

const DisplayPages=(props: { pages: number; handleChange: React.ChangeEventHandler<HTMLSelectElement> | undefined; isPlaying: boolean | undefined; })=>{
    let options=[];
    for (let i=1;i<=props.pages;i++){
        options.push(<option value={i}>{i}</option>)
    }
    return (
        <div className='row page-view'>
            <div className='col-2'>
            <label htmlFor='pageSelect'>Page:</label>
            </div>
            <div className='col-2'>
            <select id="pageSelect" className="form-control" onChange={props.handleChange} disabled={props.isPlaying}>{options}</select>
            </div>
        </div>
    )
}

const Display=(props: { rhythms: any; rhythm: any; handleRhythm: any; isPlaying: any; pages: any; handleChange: any; })=>{
    const {rhythms,rhythm,handleRhythm,isPlaying,pages,handleChange}=props
    return(
        <div>
        <h4>Your Rhythms/Groupings</h4>
        <table className='table'>
        <DisplayHeader/>
        <DisplayBody rhythms={rhythms} handleRhythm={handleRhythm} rhythmActive={rhythm} isPlaying={isPlaying}/>
        <DisplayPages pages={pages} handleChange={handleChange} isPlaying={isPlaying}/>
        </table>
        </div>
    )
}

export default Display