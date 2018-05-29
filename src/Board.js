import React, { Component } from 'react'
import './App.css'
import Cell from './Cell'
import Knight from './Knight'

const letters = 'ABCDEFGH'

const columns = []
for (let i = 0; i < 8; i++) {
  const cell = []
  for (let j = 0; j < 8; j++) {
    cell.push(`${letters[i]}${8-j}`)
  }
  columns.push(cell)
}

class Board extends Component {

  constructor(props) {
    super(props)
    this.state = {
        initialPosition: ''
    }
  }
  setInitialPosition (selectedCell) {
    this.setState({ initialPosition: selectedCell })
  }

  render () {
    const { initialPosition } = this.state
    return (
      <div className="App">
          {columns.map(column =>
            <div className="Board-column" key={column}>
              {column.map(cell =>
                <div className="Board-cell" key={cell} onClick={() => this.setInitialPosition(cell)}>
                  <Cell id={cell} selected={initialPosition === cell}>
                    <Knight />
                  </Cell>
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Board
