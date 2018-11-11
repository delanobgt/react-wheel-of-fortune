import 'bulma/css/bulma.css'
import React, { Component, Fragment } from 'react'
import { MdBlock } from 'react-icons/md'

class WinDialog extends Component {

  render() {
    const { open } = this.props

    return (
      <Fragment>
        <div className={`modal ${open ? 'is-active' : ''}`}>
          <div className="modal-background" style={{ background: 'rgba(0,0,0,0.35)' }}></div>
          <div className="modal-content" style={{ maxWidth: '320px' }}>
            <div className="card" 
              style={{ background: 'red', borderRadius: '15px' }}>
              <div className="card-content" style={{ textAlign: 'center' }}>
                <div>
                  <MdBlock 
                    style={{ color: 'white', fontSize: '5em'}}
                  /> 
                </div>
                <div
                  style={{ color: 'white', fontSize: '2em'}}
                >
                  Try again :(
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
