import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'

class GuessCharacterDialog extends Component {
  
  state = {
    answer: '',
  }

  closeSelf = () => {
    const { toggleGuessCharacterDialog } = this.props
    toggleGuessCharacterDialog(false)
  }

  handleAnswerChange = e => {
    const value = e.target.value.toUpperCase()
    if (!value.match(/^[A-Z]?$/)) return
    this.setState({ answer: value })
  }

  render() {
    const { answer } = this.state
    const { open } = this.props

    return (
      <Fragment>
        <div className={`modal ${open ? 'is-active' : ''}`}>
          <div className="modal-background" onClick={this.closeSelf}></div>
          <div className="modal-content" style={{ maxWidth: '270px' }}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4" style={{ textAlign: 'center' }}>Guess a Character</p>
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <input 
                      className="input is-success is-rounded" 
                      type="text" 
                      placeholder="A-Z" 
                      onChange={this.handleAnswerChange}
                      value={answer}
                      style={{ textAlign: 'center' }}/>
                  </div>
                </div>
                <div className="content" style={{ textAlign: 'center' }}>
                  <button className="button is-primary" >Submit</button>
                </div>
              </div>
            </div>
            <button 
              className="modal-close is-large" 
              aria-label="close" 
              onClick={this.closeSelf}
            ></button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default GuessCharacterDialog
