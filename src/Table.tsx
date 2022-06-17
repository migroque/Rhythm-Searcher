import React, {Component} from "react";
import './BootStrap/bootstrap.css'

// Use this file to handle the structure of rhythm tables. 
const TableHeader = () => {
    return(<thead> <tr>
                <th>Min Group Size</th>
                <th>Max Group Size</th>
                <th>Number of Measures</th>
                <th>Time Signature</th>
                <th>Subdivision</th>
                <th>Clear</th>
                </tr>
    </thead>)
}
const TableBody = (props: { submitData: any[]; removeCharacter: (arg0: any) => void; }) => {
    const rows = props.submitData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.minGroup}</td>
          <td>{row.maxGroup}</td>
          <td>{row.numMeas}</td>
          <td>{row.timeSig}</td>
          <td>{row.subDiv}</td>
          <td><button className='btn btn-primary'onClick={()=> props.removeCharacter(index)}>Delete</button></td>
        </tr>
      )
    })
    return <tbody>{rows}</tbody>
  }

  /*class Table extends Component {
    render() {
      const {characterData,removeCharacter} = this.props
  
      return (
        <table>
          <TableHeader />
          <TableBody characterData={characterData} removeCharacter={removeCharacter} />
        </table>
      )
    }
  }
  */
const Table = (props: { submitData: any; removeCharacter: any; }) => {
    const {submitData, removeCharacter} = props
  
    return (
      <table className="table">
        <TableHeader />
        <TableBody submitData={submitData} removeCharacter={removeCharacter} />
      </table>
    )
  }
export default Table