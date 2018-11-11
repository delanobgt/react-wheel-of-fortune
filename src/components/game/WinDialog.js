import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'

class WinDialog extends Component {

  render() {
    const { wonScore } = this.props

    return (
      <Fragment>
        <div className={`modal ${wonScore ? 'is-active' : ''}`}>
          <div className="modal-background" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
          <div className="modal-content" style={{ maxWidth: '350px' }}>
            <div 
              className="card" style={{ background: 'lightgreen', borderRadius: '15px' }}>
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div>
                  <p
                    style={{ color: 'white', fontSize: '5em'}}
                  >
                  {wonScore}
                  </p>
                </div>
                <div
                  style={{ color: 'white', fontSize: '2em'}}
                >
                  points
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default WinDialog
