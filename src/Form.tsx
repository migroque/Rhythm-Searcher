import { kStringMaxLength } from 'buffer';
import React, {Component} from 'react'

// Use this form to handle submissions to search for rhythms
type myState={
    minGroup: number,
    maxGroup:number,
    timeSig:string,
    subDiv:string,
}
class Form extends Component<{},myState>{
    initialState={
        minGroup:3,
        maxGroup:5,
        timeSig:'4/4',
        subDiv: 'Eighths',
    }
    constructor(props){
        super(props);
        this.state={
            minGroup:3,
            maxGroup:5,
            timeSig:'4/4',
            subDiv: 'Eighths',
        }
    }
    handleChange = (event) =>{
        const {name, value}=event.target
        this.setState(
            {
                [name]:value,
            }
        )
    }
    submitForm=()=>{
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }
    render(): React.ReactNode {

        return(
            <form className="form-horizontal" onSubmit={this.submitForm}>
            <div className="form-group">
                <label htmlFor='Min'>Minimum Group Size</label>
                <input type="number" max="9" min="1" name="min" step="1" value={this.state.minGroup}/>
                <label htmlFor='Max'>Maximum Group Size</label>
                <input type="number" max="9" min="2" name="max" step="1" value={this.state.maxGroup}/>
                <label htmlFor="name">Name</label>
                <label htmlFor="TimeSig">Time Signature</label>
                <select name="TimeSig" id="TimeSig">
                <option value="4/4">4/4</option>
                <option value="3/4">3/4</option>
                <option value="5/4">5/4</option>
                <option value="7/4">7/4</option>
                <option value="11/8">11/8</option>
                <option value="15/16">15/16</option>
            </select>
            
            <label htmlFor="Subdiv">Subdivision</label>
            <select name="Subdiv" id="sbd">
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