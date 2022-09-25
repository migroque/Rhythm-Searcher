import React, {Component,useEffect,useState} from 'react';
import Table from './Table'
import Form from './Form'
import Display from './Display'
import {TimeSigtoNum,SubdivtoNum} from "./Interfaces";
import './App.css';
import snare from "./samples/snare.wav"
import kick from "./samples/kick.wav"
import click from "./samples/click.wav"

import './BootStrap/bootstrap.css'
import Tempo from './PlaybackSettings';



const rhythm={
  timeSig: "4/4",
  subdiv: "eighths",
  arr: [3,3,3,3,3,3,3,3,3,3,2]
}
//[3,3,3,3,3,1],[5,5,5,1]

const App=()=>{
  // Setting states for submissions and playback variables
  
  const [submissions,setSubmissions]=useState([])
  const [rhythmTable,setTable]=useState([])
  const [beat,setBeat]=useState(0)
  const [tempo,setTempo]=useState(120)
  const [playing,setPlaying]=useState(false)
  const [ind,setInd]=useState(0)
  const [rhythm,setRhythm]=useState([3,3,3,3,1,3])
  const [timeSig,setTimeSig]=useState("4/4")
  const [subDiv,setSubDiv]=useState("Eighths")
  const [numMeas,setNumMeas]=useState(2)
  const [numBeats,setNumBeats]=useState(TimeSigtoNum.get(timeSig)*SubdivtoNum.get(subDiv))
  const [maxNotes,setMaxNotes]=useState(numBeats*numMeas)
  const [bassCount,setBassCount]=useState(0);
  console.log(SubdivtoNum.get(subDiv))

  // Setting the sound array
  const Click=new Audio(click);
  const Snare=new Audio(snare);
  const Kick=new Audio(kick);
  const sounds=new Array(Click,Snare,Kick);

  // Getting the time interval for each beat
  const [timeInt,setTimeInt]=useState(60000/(tempo*SubdivtoNum.get(subDiv)))
  
  
  //Functions to set different state variables

  // Set tempo/time interval
  /*
  const handleTempo=(event)=>{
    const eventVal=event.target.value
    setTempo(parseInt(eventVal))
    setTimeInt(60000/(tempo*SubdivtoNum.get(subDiv)))
  }
*/
  // Set rhythm/prefixSum
  const handleRhythm=(rhythm)=>{
    setRhythm(rhythm)
  }

  // Playing Toggle:
  const togglePlaying=()=>{
    setPlaying(!playing)
    // Resetting all the playback counts
    if (playing==false){
      setBassCount(0);
      setBeat(0);
      setInd(0);
    }
  }

  

  // Playback Functions
  const playNotes=()=>{
    
    // Click condition
    if (beat%(SubdivtoNum.get(subDiv))==0){
        sounds[0].play();
    }
    
    //Snare condition (only quarter notes)
    if (timeSig[2]=='4'){
        if (timeSig[0]=='4'||timeSig[0]=='5'){
            if (((beat-SubdivtoNum.get(subDiv))%numBeats==0)||((beat-3*SubdivtoNum.get(subDiv))%numBeats==0)){
                sounds[1].play();
            }
        }
        
    }
    //Kick 
    let changed=false;
    if (bassCount==rhythm[ind]-1){
      if (bassCount==0){
        sounds[2].play();
        
      }
        changed=true;
        setBassCount(0);
        
    }
    else{
      if (bassCount==0){
        sounds[2].play();
        
      }
      setBassCount((bassCount)=>++bassCount)
    }
    return changed;
    
}
useEffect(()=>{
    if (playing){
        const interval=setInterval(()=>{
            const changed=playNotes();
            if (changed){
                
                if (ind<rhythm.length-1){
                  
                  setInd((ind)=>++ind);
                  
                    
                }
                else{
                    setInd(0);
                }
            }
            
            if (beat<maxNotes-1){
                setBeat((beat)=>++beat);
            }
            else{
                setBeat(0)
            }
        },timeInt);
        return ()=>clearInterval(interval);
    }
}
)

  // Function to get form submission and make an Fetch Request for 1) First 50 rhythms in the server and 2) the number of rhythms
  /*

  */


  // Function to change the state to the array of rhythms we got
  /*
  fetch=()=>{
    fetch(url,{timeSig,subdiv,numMeas,})
  }
  */

  // Turn the rhythm string into an int array, then 
  
  
  
  const removeCharacter= (index: number)=> {
    const submits = submissions

    setSubmissions(submits.filter((character,i)=>{
      return i!==index
    } ))
  }
// Submission function: Fetch the first 50 rhythms of this 
  const handleSubmit= (submit: any)=>{
    let url="http://127.0.0.1:8000/rhythms";
    const sig=submit.timeSig[0]+"Y"+submit.timeSig[2]
    const search=url+"/"+submit.minGroup+"/"+submit.maxGroup+"/"+submit.numMeas+"/"+sig+"/0/"+submit.subDiv+'/'
    
    fetch(search)
      .then((response)=> {
        return response.text();
      })
      .then((text)=>{
        console.log(text)
        //renderRhythm(text)
      })
      .catch(function(error){
          console.log(error);
      })
    setTimeSig(submit.timeSig)
    setSubDiv(submit.subDiv)
    setNumMeas(submit.numMeas)

    setNumBeats((TimeSigtoNum.get(timeSig)*SubdivtoNum.get(subDiv)))
    setMaxNotes(numBeats*numMeas)

    setSubmissions((submissions)=>[...submissions,submit])
    
  }
  
  

  return (
    <div className="container">
        <h1>Rhythm Searcher</h1>
        <Table submitData={submissions} removeCharacter={removeCharacter} />
        <Form handleSubmit={handleSubmit}/>
        <button onClick={togglePlaying} className='btn btn-primary'>Play</button>
      </div>
    )
  
}


//<Tempo defaultValue={tempo} onChange={(event)=>handleTempo(event)}/>
//<Display handleRhythm={handleRhythm} rhythms={rhythmTable}/>
        
export default App;
