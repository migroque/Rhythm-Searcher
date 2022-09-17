import React, {Component,useEffect} from 'react';
import Table from './Table'
import Form from './Form'
import Playback from './Playback';
import './App.css';
import snare from "./samples/snare.wav"

import './BootStrap/bootstrap.css'



const rhythm={
  timeSig: "4/4",
  subdiv: "eighths",
  arr: [3,3,3,3,3,3,3,3,3,3,2]
}
const Snare=new Audio(snare);
let ind=0;
class App extends Component{
  // State should probably be the rhythms generated
  state={
    submissions:[
      
    ],
    rhythmTable:[

    ],
    isPlaying:false,

  }
  
  
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
  /*
  ArrayRender=()=>{
    for (array) in fetched:

  }
  */
  removeCharacter= (index: number)=> {
    const {submissions} = this.state

    this.setState({submissions: submissions.filter((character,i)=>{
      return i!==index
    } )})
  }
  handleSubmit= (submit: any)=>{
    let url="figure this out later";
    fetch(url,{body: JSON.stringify(submit)})
      .then((response)=> {
        return response.json();
      })
      .then()
      .catch(function(error){
          console.log(error);
      })
    

    this.setState({submissions:[...this.state.submissions, submit]})
    
  }
  // <Playback {tempo=tempo}/>, this.setState({tempo=newTempo}) to set the tempo of playback as well as the new tempo
  render() {
    const {submissions} = this.state
    return (
      <div className="container">
        <h1>Rhythm Searcher</h1>
        <Table submitData={submissions} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
        <Playback rhythm={rhythm} tempo={120}/>
        
      </div>
    )
  }
}


export default App;
