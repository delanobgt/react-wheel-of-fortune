import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import Sketch from './Sketch'

class SpinTheWheelDialog extends Component {

  closeDialog = () => {
    const { toggleSpinTheWheelDialogOpen } = this.props
    toggleSpinTheWheelDialogOpen(false)
  }

  render() {
    const { scoreMultiplier } = this.props.state
    const { open, wheelTrigger, setScoreMultiplier, toggleWheelTrigger } = this.props

    return (
      <Fragment>
        <div className={`modal ${open ? 'is-active' : ''}`}>
          <div className="modal-background" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={this.closeDialog}></div>
          <div className="modal-content" style={{ maxWidth: '400px', background: 'lightgray' }}>
            <div className="card">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <P5Wrapper sketch={Sketch} wheelTrigger={wheelTrigger} setScoreMultiplier={setScoreMultiplier} toggleWheelTrigger={toggleWheelTrigger}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <p>
                  { scoreMultiplier ? `You got ${scoreMultiplier} X multiplier` : 'Waiting for spin..' }
                </p>
                <button 
                  className="button is-warning" 
                  onClick={scoreMultiplier ? 
                    () => this.closeDialog() : () => this.props.toggleWheelTrigger(true)}
                  style={{ fontWeight: 'bold', fontSize: '1.25em' }}
                  disabled={wheelTrigger}
                >
                  { scoreMultiplier ? 'Okay' : 'Spin' }
                </button>
              </div>
              <br/><br/>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SpinTheWheelDialog
