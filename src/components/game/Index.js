import 'bulma/css/bulma.css'
import '../../App.css'
import _ from 'lodash'
import React, { Component } from 'react'
import Board from './Board'
import GuessCharacterDialog from './GuessCharacterDialog'
import GuessPhraseDialog from './GuessPhraseDialog'
import WinDialog from './WinDialog'
import LoseDialog from './LoseDialog'
import ButtonCatalog from './ButtonCatalog'
import RoundChangeDialog from './RoundChangeDialog'
import SpinTheWheelDialog from './SpinTheWheelDialog'
import GameList from '../../GameList'
import Sound from 'react-sound'

class GameIndex extends Component {

  // 1 game consists of many questions
  constructor(props) {
    super(props)
    const gameList = _.shuffle(GameList)
    const currentGame = _.head(gameList)
    const currentQuestion = _.head(currentGame)
    const userAnswer = _.chain(currentQuestion.answer)
      .map(char => char === ' ' ? ' ' : '*')
      .join('')
      .value()
    this.state = {
      userAnswer,
      attemptedCharacters: [],

      scoreMultiplier: null,
      wheelTrigger: false,

      gameList,
      gameListIndex: 0,
      currentGame,

      currentRound: 0,
      currentQuestion,

      guessCharacterDialogOpen: false,
      guessPhraseDialogOpen: false,
      wonScore: false,
      loseDialogOpen: false,
      roundChangeDialogOpen: false,
      spinTheWheelDialogOpen: false,

      playWinSound: false,
      playLoseSound: false,
    }
  }

  setScoreMultiplier = (value) => {
    this.setState({ scoreMultiplier: value })
  }

  nextGame = () => {
    let { gameListIndex, gameList } = this.state
    if (gameListIndex === gameList.length-1) {
      gameList = _.shuffle(gameList)
      const currentGame = _.head(gameList)
      const currentQuestion = _.head(currentGame)
      const userAnswer = _.chain(currentQuestion.answer)
        .map(char => char === ' ' ? ' ' : '*')
        .join('')
        .value()
      this.setState({
        userAnswer,
        attemptedCharacters: [],
        gameList,
        gameListIndex: 0,
        currentGame,
        currentRound: 0,
        currentQuestion,
      })
    } else {
      const nextGameListIndex = gameListIndex + 1
      const currentGame = gameList[nextGameListIndex]
      const currentQuestion = _.head(currentGame)
      const userAnswer = _.chain(currentQuestion.answer)
        .map(char => char === ' ' ? ' ' : '*')
        .join('')
        .value()
      this.setState({
        userAnswer,
        attemptedCharacters: [],
        gameListIndex: nextGameListIndex,
        currentGame,
        currentRound: 0,
        currentQuestion,
      })
    }
  }

  nextRound = () => {
    const { currentRound, currentGame } = this.state
    const nextRound = currentRound + 1
    const nextQuestion = currentGame[nextRound]
    const newUserAnswer = _.chain(nextQuestion.answer)
      .map(char => char === ' ' ? ' ' : '*')
      .join('')
      .value()
    this.setState({
      userAnswer: newUserAnswer,
      attemptedCharacters: [],
      currentRound: nextRound,
      currentQuestion: nextQuestion,
    })
  }

  toggleWheelTrigger = status => {
    this.setState({ wheelTrigger: status })
  }

  toggleSpinTheWheelDialogOpen = open => {
    this.setState({ spinTheWheelDialogOpen: open })
  }

  toggleGuessPhraseDialog = open => {
    this.setState({ guessPhraseDialogOpen: open })
  }

  toggleGuessCharacterDialog = open => {
    this.setState({ guessCharacterDialogOpen: open })
  }

  guessCharacter = (character) => {
    const { attemptedCharacters, userAnswer, currentQuestion: { answer }, scoreMultiplier } = this.state
    this.setState({ attemptedCharacters: [...attemptedCharacters, character] })
    if (answer.includes(character)) {
      const newUserAnswer = _.chain(answer)
        .map(char => 
          char === character || userAnswer.includes(char) ? char : 
          char === ' ' ? ' ' : 
          '*')
        .join('')
        .value()
      this.setState({ userAnswer: newUserAnswer })
      const wonScore = _.countBy(answer)[character] * scoreMultiplier
      this.toastWinDialog(wonScore)
      if (newUserAnswer === answer) {
        setTimeout(() => this.toggleRoundChangeDialog(true), 2500)
      }
    } else {
      this.toastLoseDialog()
    }
  }

  guessPhrase = (phrase) => {
    const { userAnswer, currentQuestion: { answer }, scoreMultiplier } = this.state
    if (answer === phrase) {
      this.setState({ userAnswer: phrase })
      const wonScore = _.countBy(userAnswer)['*'] * scoreMultiplier
      this.toastWinDialog(wonScore)
      setTimeout(() => this.toggleRoundChangeDialog(true), 2500)
    } else {
      this.toastLoseDialog()
    }
  }

  toggleRoundChangeDialog = (open) => {
    this.setState({ roundChangeDialogOpen: open })
  }

  toastWinDialog = (score) => {
    setTimeout(() => {
      this.setState({ wonScore: score, playWinSound: true })
      setTimeout(() => {
        this.setState({ wonScore: 0, playWinSound: false, scoreMultiplier: null })
      }, 2000)
    }, 250)
  }
  
  toastLoseDialog = () => {
    setTimeout(() => {
      this.setState({ loseDialogOpen: true, playLoseSound: true })
      setTimeout(() => {
        this.setState({ loseDialogOpen: false, playLoseSound: false })
      }, 2000)
    }, 250)
  }

  render() {
    const {
      currentRound,
      currentQuestion: { category },
      guessCharacterDialogOpen,
      guessPhraseDialogOpen,
      wonScore,
      loseDialogOpen,
      roundChangeDialogOpen,
      spinTheWheelDialogOpen,
      wheelTrigger,
      scoreMultiplier,

      playWinSound,
      playLoseSound,
    } = this.state

    return (
      <div>
        { playWinSound ? (
            <Sound
              url="win.mp3"
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          ) : null 
        }
        { playLoseSound ? (
            <Sound
              url="lose.mp3"
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={this.handleSongFinishedPlaying}
            />
          ) : null 
        }

        <br/>
        <div style={{ textAlign: 'center' }}>
          <p style={{ display: 'inline-block', color: 'white', background: 'green', fontSize: '1.75em', fontWeight: 'bold', padding: '0 0.35em' }}>
            ROUND {currentRound + 1}
          </p>
        </div>
        <Board state={this.state} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ background: 'white', display: 'inline-block', padding: '0.05em 1.2em', fontWeight: 'bold', fontSize: '1.5em', width: '720px', marginBottom: '0.5em' }}>
            {category}
          </p>
        </div>
        <br/>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <button 
            className={`button ${scoreMultiplier ? 'is-success' : 'is-danger'}`} 
            onClick={ scoreMultiplier ? () => {} : () => {
              this.toggleSpinTheWheelDialogOpen(true)
              this.setScoreMultiplier(null)
            }}
            style={{ fontWeight: 'bold', fontSize: '1.25em' }}
          >
            { scoreMultiplier ? `${scoreMultiplier} X Multiplier` : 'Spin the Wheel' }
          </button>
          <button 
            className="button is-warning" 
            onClick={() => this.toggleGuessPhraseDialog(true)}
            style={{ fontWeight: 'bold', fontSize: '1.25em' }}
            disabled={!Boolean(scoreMultiplier)}
          >
            Guess the Phrase
          </button>
        </div>
        <br/>
        <ButtonCatalog
          state={this.state}
          guessCharacter={this.guessCharacter}
        />
        
        <GuessPhraseDialog 
          state={this.state}
          open={guessPhraseDialogOpen} 
          toggleGuessPhraseDialog={this.toggleGuessPhraseDialog}
          guessPhrase={this.guessPhrase}
        />
        <GuessCharacterDialog 
          state={this.state}
          open={guessCharacterDialogOpen} 
          toggleGuessCharacterDialog={this.toggleGuessCharacterDialog} 
          guessCharacter={this.guessCharacter}
        />
        <RoundChangeDialog
          open={roundChangeDialogOpen}
          state={this.state}
          toggleRoundChangeDialog={this.toggleRoundChangeDialog}
          nextGame={this.nextGame}
          nextRound={this.nextRound}
        />
        <WinDialog
          wonScore={wonScore}
        />
        <LoseDialog
          open={loseDialogOpen}
        />
        <SpinTheWheelDialog
          state={this.state}
          open={spinTheWheelDialogOpen}
          wheelTrigger={wheelTrigger}
          toggleSpinTheWheelDialogOpen={this.toggleSpinTheWheelDialogOpen}
          toggleWheelTrigger={this.toggleWheelTrigger}
          setScoreMultiplier={this.setScoreMultiplier}
        />
      </div>
    )
  }
}

export default GameIndex
