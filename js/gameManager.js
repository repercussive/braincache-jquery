import { gameStatus } from './_constants'
import allWords from './resources/words'
import saveScore from './saveScore'
import getRandomArrayItem from './helpers/getRandomArrayItem'
import shuffleArray from './helpers/shuffleArray'

export class GameManager {
  score = 0
  lives = 3
  status = gameStatus.AWAIT_USER_ANSWER

  /** @type {LevelData} */
  levelData

  #unseenWords = allWords
  #seenWords = []

  constructor() {
    this.levelData = this.generateLevel()
  }

  get hasGameEnded() {
    return this.lives === 0 || this.#unseenWords.length === 0
  }

  generateLevel = () => {
    this.status = gameStatus.AWAIT_USER_ANSWER
    const correctAnswer = this.#pickRandomUnseenWord()
    const incorrectOptions = this.#pickRandomSeenWords()
    const options = [correctAnswer, ...incorrectOptions]
    shuffleArray(options)

    this.levelData = {
      options,
      correctAnswer
    }

    return this.levelData
  }

  submitAnswer = (answer) => {
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

  handleGameEnd = () => {
    if (this.hasGameEnded === false) return
    this.status = gameStatus.GAME_END
    saveScore(this.score)
  }

  #handleCorrectAnswer = () => {
    this.status = gameStatus.CORRECT_ANSWER
    this.score += 1
  }

  #handleIncorrectAnswer = () => {
    this.status = gameStatus.INCORRECT_ANSWER
    this.lives -= 1
  }
}