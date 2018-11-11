import 'bulma/css/bulma.css'
import _ from 'lodash'
import React, { Component, Fragment } from 'react'

class GuessPhraseDialog extends Component {
  
  state = {
    answer: '',
  }

  componentDidUpdate() {
    this.input.focus()
  }

  closeSelf = () => {
    const { toggleGuessPhraseDialog } = this.props
    toggleGuessPhraseDialog(false)
    this.setState({ answer: '' })
  }

  handleAnswerChange = e => {
    const value = e.target.value.toUpperCase()
    this.setState({ answer: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { guessPhrase } = this.props
    const { answer } = this.state
    const cleanedAnswer = _.chain(answer)
      .split(/ +/)
      .join(' ')
      .trim()
      .value()
    guessPhrase(cleanedAnswer)
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
          <div className="modal-content" style={{ maxWidth: '350px' }}>
            <div className="card">
              <div className="card-content">
                <form onSubmit={this.handleSubmit}>
                  <div className="media">
                    <div className="media-content">
                      <p className="title is-4" style={{ textAlign: 'center' }}>Guess the Phrase</p>
                    </div>
                  </div>
                    <div className="control">
                  <div className="field">
                      <input 
                        ref={(input) => this.input = input}
                        required={true}
                        className="input is-success is-rounded" 
                        type="text"
                        placeholder="Complete Phrase" 
                        onChange={this.handleAnswerChange}
                        value={answer}
                        style={{ textAlign: 'center' }}
                      />
                    </div>
                  </div>
                  <br/>
                  <div className="content" style={{ textAlign: 'center' }}>
                    <button className="button is-primary" type="submit">Submit</button>
                  </div>
                </form>
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

export default GuessPhraseDialog
