import React, { Component } from 'react'

class Cell extends Component {
  render() {
    const { id, children, selected, highlight } = this.props
    const display = selected ? 'visible' : 'hidden'

    return (
      <div className={`cell ${highlight}`}>
        <div className="cell-id">{id}</div>
        <div className={`piece ${display}`}>{children}</div>
      </div>
    )
  }
}

export default Cell
