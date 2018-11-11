import 'bulma/css/bulma.css'
import './board.css'
import _ from 'lodash'
import React, { Component, Fragment } from 'react'

class GameIndex extends Component {
  
  createRow = (size) => [...Array(size).keys()].map(e => <div key={_.uniqueId()} className="play-box"></div>)

  render() {
    const { userAnswer, currentQuestion: { category, answer } } = this.props.state
    console.log({ category, answer })

    return (
      <Fragment>
        <p>{userAnswer}</p>

        <div className="main-board">
          <div className="row-box">
            <div className="empty-box"></div>
            {this.createRow(12)}
            <div className="empty-box"></div>
          </div>

          <div className="row-box">
            {this.createRow(14)}
          </div>

          <div className="row-box">
            {this.createRow(14)}
          </div>

          <div className="row-box">
            <div className="empty-box"></div>
            {this.createRow(12)}
            <div className="empty-box"></div>        
          </div>
        </div>
      </Fragment>
    )
  }
}

export default GameIndex
