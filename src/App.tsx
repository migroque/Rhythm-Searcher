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
  
  
  const [rhythmTable,setTable]=useState([[3,3,4,3,3,3,3,2],[3,3,4,3,4,5,2]])
  const [beat,setBeat]=useState(0)
  const [tempo,setTempo]=useState(120)
  const [playing,setPlaying]=useState(false)
  const [ind,setInd]=useState(0)
  const [rhythm,setRhythm]=useState([3,3,4,3,3,3,3,2])

  // State Variables that are used for searching and modified by the form
  const [timeSig,setTimeSig]=useState("4/4")
  const [subDiv,setSubDiv]=useState("8th Note Triplets")
  const [numMeas,setNumMeas]=useState(2)
  const [minGroup,setMinGroup]=useState(3)
  const [maxGroup,setMaxGroup]=useState(5)

  // Playback Settings
  const [numBeats,setNumBeats]=useState(TimeSigtoNum.get(timeSig)*SubdivtoNum.get(subDiv))
  const [maxNotes,setMaxNotes]=useState(numBeats*numMeas)
  const [bassCount,setBassCount]=useState(0);
  const [halfTime,setHalfTime]=useState(false)

  const [pages,setPages]=useState(1)
  

  // Setting the sound array
  const Click=new Audio(click);
  const Snare=new Audio(snare);
  const Kick=new Audio(kick);
  const sounds=new Array(Click,Snare,Kick);

  // Getting the time interval for each beat
  const [timeInt,setTimeInt]=useState(60000/(tempo*SubdivtoNum.get(subDiv)))
  
  
  
  //Functions to set different state variables

  // Set tempo/time interval
  
  const handleTempo=(event)=>{
    const eventVal=event.target.value
    setTempo(parseInt(eventVal))
    setTimeInt(60000/(tempo*SubdivtoNum.get(subDiv)))
  }
  const incTempUp=()=>{
    setTempo((tempo)=>++tempo)
    console.log(tempo)
    setTimeInt(60000/((tempo+1)*SubdivtoNum.get(subDiv)))
    console.log(timeInt)
  }
  const incTempDown=()=>{
    setTempo((tempo)=>--tempo)
    setTimeInt(60000/((tempo-1)*SubdivtoNum.get(subDiv)))
  }

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

  const toggleHalfTime=()=>{
    setHalfTime(!halfTime)
    // Resetting all the playback counts
    if (playing==false){
      setBassCount(0);
      setBeat(0);
      setInd(0);
    }
  }
  

  // Playback Functions
  const playNotes=()=>{
    let playing=[]
    // Click condition
    if (beat%(SubdivtoNum.get(subDiv))==0){
        
        playing.push(sounds[0])
    }
    
    //Snare condition (only quarter notes)
    if (timeSig[2]=='4'){
        if (timeSig[0]=='4'||timeSig[0]=='5'){
            if ((!halfTime)&&(((beat-SubdivtoNum.get(subDiv))%numBeats==0)||((beat-3*SubdivtoNum.get(subDiv))%numBeats==0))){
                
                playing.push(sounds[1])
            }
            else if (halfTime&&((beat-2*SubdivtoNum.get(subDiv))%numBeats==0)){
              
              playing.push(sounds[1])
            }
        }
        
    }
    //Kick 
    if (bassCount==0){
      
      playing.push(sounds[2])
      
    }
    let changed=false;
    if (bassCount==rhythm[ind]-1){
      
        changed=true;
        setBassCount(0);
        
    }
    else{
      
      setBassCount((bassCount)=>++bassCount)
    }
    for (let i=0;i<playing.length;i++){
      playing[i].play()
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


  // Function to change the state to the array of rhythms we got, which then displays them below our search form.
  
  const draw=(rhythms)=>{
    console.log(rhythms)
    let newTable=[]
    let numArr=[]
    let arr=rhythms.split("\n")
    
    let length=arr.pop()
    
    
    for (let i=0;i<arr.length;i++){
      for (let j=0;j<arr[i].length;j++){
        numArr=[...numArr,parseInt(arr[i][j])]
      }
      newTable=[...newTable,numArr]
      numArr=[]
    }
    setTable(newTable)
    setPages(parseInt(length))
    
    setRhythm(newTable[0])
  }
  

  // Turn the rhythm string into an int array, then 
  
// Function to get different index of rhythms
const handleChange=(event)=>{
  console.log(event.target.value)
  let url="http://127.0.0.1:8000/rhythms";
  const sig=timeSig[0]+"Y"+timeSig[2]
  const search=url+"/"+minGroup+"/"+maxGroup+"/"+numMeas+"/"+sig+"/"+(event.target.value-1)+"/"+subDiv+'/'
  setInd(event.value)
  fetch(search)
      .then(
        (response)=> {
          if (!response.ok){
            throw new Error("404 Error. Search Failed")
          }
          else{
            return response.text();
          }
        
      })
      .then((text)=>{
        
        draw(text)
        //renderRhythm(text)
      })
      .catch(function(error){
          alert(error)
          
      })
}

// Submission function: Fetch the first 50 rhythms with these parameters from the server.
  const handleSubmit= (submit: any)=>{
    let url="http://127.0.0.1:8000/rhythms";
    
    const sig=submit.timeSig[0]+"Y"+submit.timeSig[2]
    const search=url+"/"+submit.minGroup+"/"+submit.maxGroup+"/"+submit.numMeas+"/"+sig+"/0/"+submit.subDiv+'/'
    
    
   
    fetch(search)
      .then(
        (response)=> {
          if (!response.ok){
            throw new Error("404 Error. Search Failed")
          }
          else{
            return response.text();
          }
        
      })
      .then((text)=>{
        
        draw(text)
        //renderRhythm(text)
      })
      .catch(function(error){
          alert(error)
          
      })
    setTimeSig(submit.timeSig)
    setSubDiv(submit.subDiv)
    setNumMeas(submit.numMeas)
    setMinGroup(parseInt(submit.minGroup))
    setMaxGroup(parseInt(submit.maxGroup))
    console.log(subDiv)

    setNumBeats((TimeSigtoNum.get(submit.timeSig)*SubdivtoNum.get(submit.subDiv)))
    setMaxNotes(TimeSigtoNum.get(submit.timeSig)*SubdivtoNum.get(submit.subDiv))
    setTimeInt(60000/(tempo*SubdivtoNum.get(submit.subDiv)))
    console.log(numBeats)

    
  }
  let playtext="Play";
  if (playing){
    playtext="Pause"
  }
  let halftext="Halftime?"
  if (halfTime){
    halftext="Halftime"
  }
  

  return (
    <div className="container">
        <h1>Rhythm Searcher</h1>
        <Form handleSubmit={handleSubmit} playing={playing}/>
        <button onClick={togglePlaying} className='btn btn-primary'>{playtext}</button>
        <div className='col-lg-6 mx-auto'>
        <label>Tempo</label>
        <button disabled={playing} onClick={incTempDown}>-</button>
        <input disabled={playing} type="number" min="30" max="240" value={tempo} onChange={(event)=>handleTempo(event)}/>
        <button disabled={playing} onClick={incTempUp}>+</button>
        <button disabled={playing} onClick={toggleHalfTime}>{halftext}</button>
        </div>
        <Display handleRhythm={handleRhythm} rhythms={rhythmTable} rhythm={rhythm} isPlaying={playing} pages={pages} handleChange={handleChange}/>
      </div>
    ) 
}

//Graveyard
//<Table submitData={submissions} removeCharacter={removeCharacter} />
//<Tempo value={tempo} onChange={(event)=>handleTempo(event)}/>
/*
  const removeCharacter= (index: number)=> {
    const submits = submissions

    setSubmissions(submits.filter((character,i)=>{
      return i!==index
    } ))
  }
*/

        
export default App;
