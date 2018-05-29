import React, { Component } from 'react';

class Cell extends Component {
  render () { 
    const { id, children, selected } = this.props
    const display = selected ? 'visible': 'hidden'
    return <div className="Cell">
            <div className="Cell-id">{ id }</div>
            <div className={display}>{ children }</div>
          </div>
  }
}
 
export default Cell
