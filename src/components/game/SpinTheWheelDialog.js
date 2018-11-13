import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import Sketch from './Sketch'

class SpinTheWheelDialog extends Component {

  render() {
    const { open, wheelTrigger } = this.props

    return (
      <Fragment>
        <div className={`modal ${open ? 'is-active' : ''}`}>
          <div className="modal-background" style={{ background: 'rgba(0,0,0,0.05)' }}></div>
          <div className="modal-content" style={{ maxWidth: '320px' }}>
            <div className="card">
              <div className="card-content" style={{ textAlign: 'center' }}>
                <P5Wrapper sketch={Sketch} wheelTrigger={wheelTrigger}/>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default SpinTheWheelDialog
