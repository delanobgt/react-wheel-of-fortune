import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'

class GuessCharacterDialog extends Component {
  
  state = {
    answer: '',
  }

  componentDidUpdate() {
    this.input.focus()
  }

  closeSelf = () => {
    const { toggleGuessCharacterDialog } = this.props
    toggleGuessCharacterDialog(false)
    this.setState({ answer: '' })
  }

  handleAnswerChange = e => {
    const value = e.target.value.toUpperCase()
    if (!value.match(/^[A-Z]?$/)) return
    this.setState({ answer: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { guessCharacter } = this.props
    const { answer } = this.state
    guessCharacter(answer)
    this.closeSelf()
    this.setState({ answer: '' })
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
                <form onSubmit={this.handleSubmit}>
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4" style={{ textAlign: 'center' }}>Guess a Character</p>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input 
                        ref={(input) => this.input = input}
                        required={true}
                        className="input is-success is-rounded" 
                        type="text" 
                        placeholder="A-Z" 
                        onChange={this.handleAnswerChange}
                        value={answer}
                        style={{ textAlign: 'center' }}
                      />  
                    </div>
                  </div>
                  <br/>
                  <div className="content" style={{ textAlign: 'center' }}>
                    <button type="submit" className="button is-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default GuessCharacterDialog
