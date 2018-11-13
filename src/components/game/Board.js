import 'bulma/css/bulma.css'
import './board.css'
import _ from 'lodash'
import React, { Component, Fragment } from 'react'

const array = (n) => [...Array(n)].map(e => null)

class GameIndex extends Component {

  createEmptyButton = () => (
    <button
      key={_.uniqueId()}
      className="button is-white empty-box"
    ></button>
  )
  createRow = (cols) => cols.map(e => 
    e === '*' ? ( 
      <button
        key={_.uniqueId()}
        className="button is-success play-box-content"
      >{' '}</button> 
    ) : 'A'.charCodeAt() <= (e || '').charCodeAt() && (e || '').charCodeAt() <= 'Z'.charCodeAt() ? (
      <button
        key={_.uniqueId()}
        className="button is-success play-box-content"
      >{e}</button> 
    ) : (
      <button
        key={_.uniqueId()}
        className="button is-success play-box-empty"
      >{' '}</button> 
    )

  )

  tryWordsPlacing = (answer, rowWidths) => {
    const tokens = _.split(answer, / +/)
    const resultRows = []

    let width = _.head(rowWidths), row = []
    rowWidths = _.tail(rowWidths)
    let tokenIndex = 0
    while (tokenIndex < tokens.length) {
      const token = tokens[tokenIndex]
      if (row.length === 0 && token.length <= width) {
        row.push(token)
        width -= token.length
        tokenIndex += 1
      } else if (row.length >= 1 && token.length + 1 <= width) {
        row.push(token)
        width -= (token.length + 1)
        tokenIndex += 1
      } else {
        resultRows.push(row)
        row = []
        if (rowWidths.length === 0) return null
        width = _.head(rowWidths)
        rowWidths = _.tail(rowWidths)
      }
    }
    if (row.length > 0) resultRows.push(row)
    return resultRows
  }

  centerWords = (words, width) => {
    if (!words) return array(width)
    const joinedWord = _.join(words, ' ')
    const leftStart = Math.floor((width - joinedWord.length) / 2)
    return [...array(leftStart), ...joinedWord.split(''), ...array(width-leftStart-joinedWord.length)]
  }

  render() {
    const { userAnswer, currentQuestion: { category, answer } } = this.props.state
    console.log({ category, answer })

    const rowsPlacing = this.tryWordsPlacing(userAnswer, [14, 14]) || this.tryWordsPlacing(userAnswer, [12, 14, 14, 12])

    const rows = []
    if (rowsPlacing.length <= 2) {
      rows.push(
        this.centerWords(null, 12), 
        this.centerWords(rowsPlacing[0], 14),
        this.centerWords(rowsPlacing[1], 14),
        this.centerWords(null, 12)
      )
    } else {
      rows.push(
        this.centerWords(rowsPlacing[0], 12),
        this.centerWords(rowsPlacing[1], 14),
        this.centerWords(rowsPlacing[2], 14),
        this.centerWords(rowsPlacing[3], 12)
      )
    }

    return (
      <Fragment>
        <div className="main-board">
          <div className="row-box">
            {this.createEmptyButton()}
            {this.createRow(rows[0])}
            {this.createEmptyButton()}
          </div>

          <div className="row-box">
          {this.createRow(rows[1])}
          </div>

          <div className="row-box">
          {this.createRow(rows[2])}
          </div>

          <div className="row-box">
            {this.createEmptyButton()}
            {this.createRow(rows[3])}
            {this.createEmptyButton()}
          </div>
        </div>
      </Fragment>
    )
  }
}

export default GameIndex
