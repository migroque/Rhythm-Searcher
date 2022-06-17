import { kStringMaxLength } from 'buffer';
import React, {Component} from 'react'

// Use this form to handle submissions to search for rhythms
type myState={
    minGroup: number,
    maxGroup:number,
    numMeas:number,
    timeSig:string,
    subDiv:string,
}

class Form extends Component<{},myState>{
    initialState={
        minGroup:3,
        maxGroup:5,
        numMeas:4,
        timeSig:'4/4',
        subDiv: 'Eighths',
    }
    constructor(props: {} | Readonly<{}>){
        super(props);
        this.state={
            minGroup:3,
            maxGroup:5,
            numMeas:4,
            timeSig:'4/4',
            subDiv: 'Eighths',
        }
    }
    handleInChange=(event: { target: any; })=>{
        const target=event.target
        const value=target.value
        const name=target.name
        this.setState(
            {
                [name]:value,
            }
        )
    }

    
    handleSelChange= (event: { target: any; })=>{
        const target=event.target
        const value=target.value
        const name=target.name
        this.setState({[name]:value})
    }
    submitForm=(event: any)=>{
        if (this.state.minGroup>this.state.maxGroup){
            alert('The minimum group size should be less than the maximum group size')
        }
        else{
            this.props.handleSubmit(this.state)
            this.setState(this.initialState)
        }
        event.preventDefault()
        
    }
    render(): React.ReactNode {
        const {minGroup,maxGroup,timeSig, subDiv}=this.state
        return(
            <form  onSubmit={this.submitForm}>
            <div className="form-group">

                <label htmlFor='Min'>Minimum Group Size</label>
                <input className='form-control' type="number" max="9" min="1" name="minGroup" step="1" 
                    value={this.state.minGroup} onChange={this.handleInChange}
                    onSubmit={this.submitForm}/>
                <label htmlFor='Max'>Maximum Group Size</label>
                <input className='form-control' type="number" max="9" min="2" name="maxGroup" step="1" value={this.state.maxGroup} 
                    onChange={this.handleInChange}
                    onSubmit={this.submitForm}/>
                <label htmlFor='numMeas'>Number of Measures</label>
                <input className='form-control' type="number" max="9" min="2" name="numMeas" step="1" value={this.state.numMeas} 
                    onChange={this.handleInChange}
                    onSubmit={this.submitForm}/>
                <label htmlFor="TimeSig">Time Signature</label>
                <select className='form-control' name="timeSig" id="TimeSig" value={this.state.timeSig} onChange={this.handleSelChange}>
                <option value="4/4">4/4</option>
                <option value="3/4">3/4</option>
                <option value="5/4">5/4</option>
                <option value="7/4">7/4</option>
                <option value="11/8">11/8</option>
                <option value="15/16">15/16</option>
            </select>
            
            <label htmlFor="Subdiv">Subdivision</label>
            <select className='form-control' name="subDiv" id="sbd" value={this.state.subDiv} onChange={this.handleSelChange}>
                <option value="Eigths">8ths</option>
                <option value="Quarters">Quarters</option>
                <option value="ETrips">8th Note Triplets</option>
                <option value="16ths">16ths</option>
                <option value="5ths">4th Note Quintuplets</option>
            </select>
                
                <input type="submit" value="Submit" onClick={this.submitForm} />
            </div>
                
            </form>
        )
    }
}

export default Form