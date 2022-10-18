import React, {Component} from 'react'

// Use this form to handle submissions to search for rhythms
type myState={
    minGroup: number,
    maxGroup:number,
    numMeas:number,
    timeSig:string,
    subDiv:string,
}

type properties={
    handleSubmit: (submit:any)=>void;
    playing:boolean
}

class Form extends Component<properties,myState>{
    initialState={
        minGroup:3,
        maxGroup:5,
        numMeas:2,
        timeSig:'4/4',
        subDiv: 'Eighths',
    }
    constructor(props: properties){
        super(props);
        this.state={
            minGroup:3,
            maxGroup:5,
            numMeas:2,
            timeSig:'4/4',
            subDiv: 'Eighths',
        }
    }
    handleInChange=(event: { target: any; })=>{
        const target=event.target
        const value=target.value
        const name=target.name
        const newState={[name]:value} as Pick<myState, keyof myState>
        this.setState(newState)
    }

    
    handleSelChange= (event: { target: any; })=>{
        const target=event.target
        const value=parseInt(target.value)
        const name=target.name
        const newState={[name]:value} as Pick<myState, keyof myState>
        this.setState(newState)
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
        let minParam=minGroup.toString()
        for (let i=parseInt(minParam);i<=parseInt(minParam)+3;i++){
            options.push(<option value={i}>{i}</option>)
        }
        return(
            <div className='search-settings'>
            <h4>Search Settings</h4>
            <form  onSubmit={this.submitForm}>
            <div className="form-group">
                <div className='row'>
                    <div className='col'>
                    <label htmlFor='Min'>Minimum Group Size</label>
                    </div>
                    <div className='col'>
                    <label htmlFor='Max'>Maximum Group Size</label>
                    </div>
                    <div className='col'>
                    <label htmlFor='numMeas'>Number of Measures</label>
                    </div>
                    <div className='col'>
                    <label htmlFor="TimeSig">Time Signature</label>
                    </div>
                    <div className='col'>
                    <label htmlFor="Subdiv">Subdivision</label>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                    <select className='form-control' name="minGroup" id="sbd" value={this.state.minGroup} onChange={this.handleSelChange}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                    </select>
                    </div>
                    <div className='col'>
                    <select className='form-control' name="maxGroup" id="sbd" value={this.state.maxGroup} onChange={this.handleSelChange}>
                        {options}
                    </select>
                    </div>
                    <div className='col'>
                    <select className='form-control' name="numMeas" id="sbd" value={this.state.numMeas} onChange={this.handleSelChange}>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </select>
                    </div>
                    <div className='col'>
                    <select className='form-control' name="timeSig" id="TimeSig" value={this.state.timeSig} onChange={this.handleSelChange}>
                        <option value="4/4">4/4</option>
                    </select>
                    </div>
                    <div className='col'>
                    <select className='form-control' name="subDiv" id="sbd" value={this.state.subDiv} onChange={this.handleSelChange}>
                        <option value="Eigths">8ths</option>
                        <option value="8th Note Triplets">8th Note Triplets</option>
                        <option value="16ths">16ths</option>
                    </select>
                    </div>
                </div>
                <input className='btn btn-primary submit-button'type="submit" value="Submit" onClick={this.submitForm} disabled={this.props.playing}/>
            </div>   
            </form>
            </div>
        )
    }
}

export default Form