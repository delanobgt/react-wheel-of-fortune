import 'bulma/css/bulma.css'
import _ from 'lodash'
import React, { Component } from 'react'

class ButtonCatalog extends Component {

  render() {
    const { guessCharacter } = this.props
    const { attemptedCharacters } = this.props.state

    const buttonStyle = {
      width: '2em',
      height: '2em',
      fontSize: '2.15em',
      fontWeight: 'bold',
      margin: '0.2em',
      padding: '0',
    }

    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          { 
            _.chain([...Array(13).keys()])
              .map(offset => {
                const currentChar = String.fromCharCode('A'.charCodeAt()+offset)
                return (
                  <button
                    key={currentChar}
                    disabled={attemptedCharacters.includes(currentChar)}
                    onClick={() => guessCharacter(currentChar)}
                    className="button is-info"
                    style={buttonStyle}
                  >
                    {currentChar}
                  </button>
                )
              })
              .value()
          }
        </div>
        <div>
          { 
            _.chain([...Array(13).keys()])
              .map(offset => {
                const currentChar = String.fromCharCode('N'.charCodeAt()+offset)
                return (
                  <button
                    key={currentChar}
                    disabled={attemptedCharacters.includes(currentChar)}
                    onClick={() => guessCharacter(currentChar)}
                    className="button is-info"
                    style={buttonStyle}
                  >
                    {currentChar}
                  </button>
                )
              })
              .value()
          }
        </div>
      </div>
    )
  }
}

export default ButtonCatalog
