import React,{Component,useEffect,useState} from "react";
import {TimeSigtoNum,SubdivtoNum} from "./Interfaces";

/*
Rhythm has different measurements:

timeSig: a string that can be "4/4" or "3/4" or "6/8", etc.
Subdiv: a string indicating subdivisions
arr: an integer array that has numbers
numMeas:
tempo: integer indicating quarter notes per minute (for now)

rhythm template:
rhythm={
    timeSig: "4/4",
    subdiv: "eighths",
    arr: [3,3,3,3,3,3,3,3,3,3,2]
}
*/





const Playback=(props: { tempo: any; rhythm: { subdiv: string; arr: string | any[]; timeSig: string[]; Subdiv: any; }; })=>{
    // Set the beat state as well as the tempo state
    const [beat,setBeat]=useState(0)
    const [tmp,setTempo]=useState(props.tempo)
    const [playing,setPlaying]=useState(false)
    const [ind,setInd]=useState(0)
    // Set up the sound array
    const click=new Audio("Korg-N1R-Metronome-Click.wav");
    const snare=new Audio("Acoustic Snare 35.wav");
    const kick=new Audio("Acoustic Kick 01.wav");
    const sounds=new Array(click,snare,kick);
    let int=tmp;
    if (props.rhythm.subdiv=="eighths"){
        int*=2;
    }
    int/=60;
    int=1/(int*1000);
    let prefix=new Array(props.rhythm.arr[0]);
    for (let i=1;i<=props.rhythm.arr.length;i++){
        prefix.push(prefix[i-1]+props.rhythm.arr[i]);
    }

    const maxNotes=(prefix[prefix.length-1]);
    let numBeats=(TimeSigtoNum.get(props.rhythm.timeSig)*SubdivtoNum.get(props.rhythm.subdiv));

    let noteNum=0;
    
    let bass=false;
    
    const togglePlay=()=>{
        setPlaying(!playing)
    }
const playNotes=()=>{
    
    // Click condition
    if (beat%(SubdivtoNum.get(props.rhythm.Subdiv))){
        sounds[0].play();
    }
    
    //Snare condition (only quarter notes)
    if (props.rhythm.timeSig[2]=='4'){
        if (props.rhythm.timeSig[0]=='4'||props.rhythm.timeSig[0]=='5'){
            if (((beat-SubdivtoNum.get(props.rhythm.subdiv))%numBeats==0)||((beat-3*SubdivtoNum.get(props.rhythm.subdiv))%numBeats==0)){
                sounds[1].play();
            }
        }
        
    }
    //Kick 
    let played=false;
    if (beat==prefix[ind]){
        sounds[2].play();
        played=true;
    }
    return played;
    
}
useEffect(()=>{
    if (playing){
        const interval=setInterval(()=>{
            const played=playNotes();
            if (played){
                if (ind<props.rhythm.arr.length){
                    setInd((ind)=>++ind);
                }
                else{
                    setInd(0);
                }
            }
            if (beat<maxNotes){
                setBeat((beat)=>++beat);
            }
            else{
                setBeat(0)
            }
        },int);
        //return ()=>clearInterval(interval);
    }
}
)
    return(
        <div>
            <button onClick={togglePlay} className='btn btn-primary'>
                Play Rhythm
            </button>
        </div>
    )
    
}

export default Playback