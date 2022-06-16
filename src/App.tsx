import React, {Component} from 'react';
import logo from './logo.svg';
import Table from './Table'
import Form from './Form'
import './App.css';
import './BootStrap/bootstrap.css'

class App extends Component{
  // State should probably be the rhythms generated
  state={
    characters:[
      
    ],
  }

  // Function to get form submission and make an XMLHTTPRequest

  // Function to change the state to the array of rhythms we got

  // Render those rhythms (or pass them down to Table)
  removeCharacter= (index)=> {
    const {characters} = this.state

    this.setState({characters: characters.filter((character,i)=>{
      return i!=index
    } )})
  }
  handleSubmit= (character)=>{
    this.setState({characters:[...this.state.characters,character]})
  }
  render() {
    const {characters} = this.state
    return (
      <div className="container">
        <h1>React Tutorial</h1>
        <Table characterData={characters} removeCharacter={this.removeCharacter} />
        <Form handleSubmit={this.handleSubmit}/>
      </div>
    )
  }
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React.
        </a>
      </header>
    </div>
  );
}
*/
/*<div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {header}
      <p>You're successfully using React</p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React.
      </a>
    </header>
  </div>*/

export default App;
