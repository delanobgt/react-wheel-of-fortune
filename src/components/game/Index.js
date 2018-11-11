import 'bulma/css/bulma.css'
import '../../App.css'
import _ from 'lodash'
import React, { Component, Fragment } from 'react'
import Board from './Board'
import GuessCharacterDialog from './GuessCharacterDialog'
import GuessPhraseDialog from './GuessPhraseDialog'
import GameList from '../../GameList'

class GameIndex extends Component {

  // 1 game consists of many questions
  constructor(props) {
    super(props)
    const gameList = _.shuffle(GameList)
    const currentGame = _.head(gameList)
    this.state = {
      gameList,
      gameListIndex: 0,
      currentGame,

      currentRound: 0,
      currentQuestion: _.head(currentGame),

      guessCharacterDialogOpen: false,
      guessPhraseDialogOpen: false,
    }
  }

  toggleGuessPhraseDialog = open => {
    this.setState({ guessPhraseDialogOpen: open })
  }

  toggleGuessCharacterDialog = open => {
    this.setState({ guessCharacterDialogOpen: open })
  }

  nextGame = () => {
    const { gameListIndex, gameList } = this.state
    if (gameListIndex === gameList.length-1) {
      gameList = _.shuffle(gameList)
      const currentGame = _.head(gameList)
      this.setState({
        gameList,
        gameListIndex: 0,
        currentGame,
        currentRound: 0,
        currentQuestion: _.head(currentGame),
      })
    } else {
      this.setState({
        gameListIndex: gameListIndex + 1,
        currentGame: gameList[gameListIndex + 1],
        currentRound: 0,
        currentQuestion: _.head(gameList[gameListIndex + 1]),
      })
    }
  }

  nextRound = () => {
    const { gameListIndex, gameList } = this.state
    if (gameListIndex === gameList.length-1) {
      gameList = _.shuffle(gameList)
      const currentGame = _.head(gameList)
      this.setState({
        gameList,
        gameListIndex: 0,
        currentGame,
        currentRound: 0,
        currentQuestion: _.head(currentGame),
      })
    } else {
      this.setState({
        gameListIndex: gameListIndex + 1,
        currentGame: gameList[gameListIndex + 1],
        currentRound: 0,
        currentQuestion: _.head(gameList[gameListIndex + 1]),
      })
    }
  }

  render() {
    const { guessCharacterDialogOpen, guessPhraseDialogOpen } = this.state

    return (
      <Fragment>
        <Board/>
        <GuessPhraseDialog open={guessPhraseDialogOpen} toggleGuessPhraseDialog={this.toggleGuessPhraseDialog} />
        <GuessCharacterDialog open={guessCharacterDialogOpen} toggleGuessCharacterDialog={this.toggleGuessCharacterDialog} />        

        <div>
          <button className="button is-primary" onClick={() => this.toggleGuessPhraseDialog(true)}>Guess the Phrase</button>
          <button className="button is-primary" onClick={() => this.toggleGuessCharacterDialog(true)}>Guess a Character</button>
        </div>
      </Fragment>
    )
  }
}

export default GameIndex
