import { gameStatus, noop } from './_constants'
import allWords from './resources/words'
import saveScore from './saveScore'
import getRandomArrayItem from './helpers/getRandomArrayItem'
import shuffleArray from './helpers/shuffleArray'

export class GameManager {
  score = 0
  lives = 3
  status = gameStatus.AWAIT_USER_ANSWER
  events = {}
  lastSubmittedAnswer = null

  /** @type {LevelData} */
  levelData

  #unseenWords = allWords
  #seenWords = []

  constructor(events) {
    this.events = {
      onGenerateLevel: events?.onGenerateLevel ?? noop,
      onSubmitAnswer: events?.onSubmitAnswer ?? noop,
      onGameEnd: events?.onGameEnd ?? noop,
      onChangeStatus: events?.onChangeStatus ?? noop,
      onChangeScore: events?.onChangeScore ?? noop,
      onLoseLife: events?.onLoseLife ?? noop,
      onGameEnd: events?.onGameEnd ?? noop
    }
    this.levelData = this.generateLevel()
  }

  get hasGameEnded() {
    return this.lives === 0 || this.#unseenWords.length === 0
  }

  generateLevel = () => {
    this.#setStatus(gameStatus.AWAIT_USER_ANSWER)
    const correctAnswer = this.#pickRandomUnseenWord()
    const incorrectOptions = this.#pickRandomSeenWords()
    const options = [correctAnswer, ...incorrectOptions]
    shuffleArray(options)

    this.levelData = {
      options,
      correctAnswer
    }

    this.events.onGenerateLevel(this)
    return this.levelData
  }

  submitAnswer = (answer) => {
    this.lastSubmittedAnswer = answer
    const { correctAnswer } = this.levelData
    const isCorrect = answer === correctAnswer
    if (!this.#seenWords.includes(correctAnswer)) {
      this.#seenWords.push(correctAnswer)
    }

    if (isCorrect) {
      this.#handleCorrectAnswer()
    } else {
      this.#handleIncorrectAnswer()
    }

    this.events.onSubmitAnswer(this)
  }

  endGame = () => {
    if (this.hasGameEnded === false) return
    saveScore(this.score)
    this.events.onGameEnd(this)
  }

  #setStatus = (newStatus) => {
    this.status = newStatus
    this.events.onChangeStatus(this)
  }

  #pickRandomUnseenWord = () => {
    const newWord = getRandomArrayItem(this.#unseenWords)
    this.#unseenWords = this.#unseenWords.filter((word) => word !== newWord)
    return newWord
  }

  #pickRandomSeenWords = () => {
    shuffleArray(this.#seenWords)
    return this.#seenWords.slice(0, Math.min(this.#seenWords.length, 2))
  }

  #handleCorrectAnswer = () => {
    this.#setStatus(gameStatus.CORRECT_ANSWER)
    this.score += 1
    this.events.onChangeScore(this)
  }

  #handleIncorrectAnswer = () => {
    this.#setStatus(gameStatus.INCORRECT_ANSWER)
    this.lives -= 1
    this.events.onLoseLife(this)
  }
}