import React, { Component } from 'react';

class Cell extends Component {
  render () { 
    const { id, children, selected, highlight } = this.props
    const display = selected ? 'visible': 'hidden'

    return <div className={`Cell ${highlight}`}>
            <div className="Cell-id">{ id }</div>
            <div className={display}>{ children }</div>
          </div>
  }
}
 
export default Cell
