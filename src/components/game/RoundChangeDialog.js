import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import { MdCheckCircle } from 'react-icons/md'

class RoundChangeDialog extends Component {

  closeSelf = () => {
    const { toggleRoundChangeDialog } = this.props
    toggleRoundChangeDialog(false)
  }

  handleProceed = () => {
    const { currentRound } = this.props.state
    const { nextGame, nextRound } = this.props
    if (currentRound < 2) {
      nextRound()
    } else {
      nextGame()
    }
    this.closeSelf()
  }

  render() {
    const { open } = this.props
    const { currentRound } = this.props.state

    return (
      <Fragment>
        <div className={`modal ${open ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-content" style={{ maxWidth: '350px' }}>
            <div className="card">
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p 
                      className="title is-4" 
                      style={{ textAlign: 'center', color: 'lightgreen', fontSize: '5em' }}
                    >
                      <MdCheckCircle />
                    </p>
                    <p className="title is-4" style={{ textAlign: 'center' }}>
                      Round {currentRound + 1} finished
                    </p>
                  </div>
                </div>
                <br/> 
                <div className="content" style={{ textAlign: 'center' }}>
                  { 
                    currentRound < 2 ? (
                      <button className="button is-primary" onClick={this.handleProceed}>
                        Proceed to Round {currentRound + 2}
                      </button>
                    ) : (
                      <button className="button is-primary" onClick={this.handleProceed}>
                        Start a new Round
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default RoundChangeDialog
