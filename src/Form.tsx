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
        let options=[];
        for (let i=parseInt(minGroup);i<=parseInt(minGroup)+3;i++){
            options.push(<option value={i}>{i}</option>)
        }
        return(
            <form  onSubmit={this.submitForm}>
            <div className="form-group">

                <label htmlFor='Min'>Minimum Group Size</label>
                <select className='form-control' name="minGroup" id="sbd" value={this.state.minGroup} onChange={this.handleSelChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                </select>
                <label htmlFor='Max'>Maximum Group Size</label>
                <select className='form-control' name="maxGroup" id="sbd" value={this.state.maxGroup} onChange={this.handleSelChange}>
                {options}
                </select>
                <label htmlFor='numMeas'>Number of Measures</label>
                <select className='form-control' name="numMeas" id="sbd" value={this.state.numMeas} onChange={this.handleSelChange}>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                </select>
                <label htmlFor="TimeSig">Time Signature</label>
                <select className='form-control' name="timeSig" id="TimeSig" value={this.state.timeSig} onChange={this.handleSelChange}>
                <option value="4/4">4/4</option>
            </select>
            
            <label htmlFor="Subdiv">Subdivision</label>
            <select className='form-control' name="subDiv" id="sbd" value={this.state.subDiv} onChange={this.handleSelChange}>
                <option value="Eigths">8ths</option>
                <option value="8th Note Triplets">8th Note Triplets</option>
                <option value="16ths">16ths</option>
            </select>
                
                <input className='btn btn-primary'type="submit" value="Submit" onClick={this.submitForm} disabled={this.props.playing}/>
            </div>
                
            </form>
        )
    }
}

export default Form