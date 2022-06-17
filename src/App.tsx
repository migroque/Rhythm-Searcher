import React, {Component} from 'react';
import logo from './logo.svg';
import Table from './Table'
import Form from './Form'
import './App.css';
import './BootStrap/bootstrap.css'

class App extends Component{
  // State should probably be the rhythms generated
  state={
    submissions:[
      
    ],
  }

  // Function to get form submission and make an XMLHTTPRequest

  // Function to change the state to the array of rhythms we got

  // Render those rhythms (or pass them down to Table)
  removeCharacter= (index: number)=> {
    const {submissions} = this.state

    this.setState({submissions: submissions.filter((character,i)=>{
      return i!=index
    } )})
  }
  handleSubmit= (submit: any)=>{
    this.setState({submissions:[...this.state.submissions, submit]})
  }
  render() {
    const {submissions} = this.state
    return (
      <div className="container">
        <h1>Rhythm Searcher</h1>
        <Table submitData={submissions} removeCharacter={this.removeCharacter} />
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
