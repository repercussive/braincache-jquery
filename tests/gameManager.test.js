import { gameStatus } from '../js/_constants'
import { GameManager } from '../js/gameManager'
import allWords from '../js/resources/words'

/** @type {GameManager} */
let gameManager

/**
 * Given some level data (i.e. possible word options and the known correct answer), 
 * returns any single incorrect answer.
 * 
 * @param {LevelData} levelData
 * @returns {string} any of the incorrect options for the given level.
 */
function getIncorrectAnswer({ options, correctAnswer }) {
  return options.filter((option) => option !== correctAnswer)[0]
}

beforeEach(() => {
  gameManager = new GameManager()
})

describe('initialising game state', () => {
  test('game starts with 3 lives', () => {
    expect(gameManager.lives).toBe(3)
  })

  test('game starts with a score of 0', () => {
    expect(gameManager.score).toBe(0)
  })
})

describe('generating levels', () => {
  test('on level 1, there is only one option, which is the correct answer', () => {
    gameManager.generateNextLevel()

    expect(gameManager.levelData.options.length).toBe(1)
    expect(gameManager.levelData.options[0]).toEqual(gameManager.levelData.correctAnswer)
  })

  test('on level 2, there are two options: one new word and one already-seen word', () => {
    // complete level 1
    gameManager.generateNextLevel()
    const levelOneCorrectAnswer = gameManager.levelData.correctAnswer
    gameManager.submitAnswer(levelOneCorrectAnswer)

    // level 2
    gameManager.generateNextLevel()
    const levelTwoCorrectAnswer = gameManager.levelData.correctAnswer
    const expectedOptions = [levelOneCorrectAnswer, levelTwoCorrectAnswer]

    expect(gameManager.levelData.options.sort()).toEqual(expectedOptions.sort())
  })

  test('on level 3, there are three options: one new word and two already-seen words', () => {
    // complete level 1
    gameManager.generateNextLevel()
    const levelOneCorrectAnswer = gameManager.levelData.correctAnswer
    gameManager.submitAnswer(levelOneCorrectAnswer)

    // complete level 2
    gameManager.generateNextLevel()
    const levelTwoCorrectAnswer = gameManager.levelData.correctAnswer
    gameManager.submitAnswer(levelTwoCorrectAnswer)

    // level 3
    gameManager.generateNextLevel()
    const levelThreeCorrectAnswer = gameManager.levelData.correctAnswer
    const expectedOptions = [levelOneCorrectAnswer, levelTwoCorrectAnswer, levelThreeCorrectAnswer]

    expect(gameManager.levelData.options.sort()).toEqual(expectedOptions.sort())
  })

  test('level generation method returns the latest level data', () => {
    expect(gameManager.generateNextLevel()).toBe(gameManager.levelData)
  })
})

describe('submitting answers', () => {
  test('after submitting a correct answer, the score increases by 1', () => {
    [1, 2, 3, 4, 5].forEach(() => gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer))
    expect(gameManager.score).toBe(5)
  })

  test('after submitting an incorrect answer, the score does not change', () => {
    // it is not possible to fail level 1; play this normally
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)

    // answer incorrectly for level 2
    gameManager.generateNextLevel()
    const incorrectAnswer = getIncorrectAnswer(gameManager.levelData)
    gameManager.submitAnswer(incorrectAnswer)

    expect(gameManager.score).toEqual(1)
  })

  test('after submitting an incorrect answer, the lives count decreases by 1', () => {
    // level 1 (answer correctly)
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)

    // level 2 (answer incorrectly)
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))

    // level 3 (answer incorrectly)
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))

    // should have 1 life remaining
    expect(gameManager.lives).toBe(1)
  })

  test('after an answer is submitted, it is registered as the last-selected answer', () => {
    gameManager.submitAnswer('abracadabra')
    expect(gameManager.lastSubmittedAnswer).toBe('abracadabra')
  })
})

describe('checking if game is ready to end', () => {
  test('when there are still lives remaining, the game is not ready to end', () => {
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))

    expect(gameManager.readyToEndGame).toBe(false)
  })

  test('when there are no lives remaining, the game is ready to end', () => {
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))

    expect(gameManager.readyToEndGame).toBe(true)
  })

  test('when there are no unseen words remaining, the game is ready to end', () => {
    for (let i = 0; i < allWords.length; i++) {
      gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)
    }

    expect(gameManager.readyToEndGame).toBe(true)
  })
})

describe('tracking game status', () => {
  test('when the game begins, the status represents "awaiting user answer"', () => {
    expect(gameManager.status).toBe(gameStatus.AWAIT_USER_ANSWER)
  })

  test('after submitting a correct answer, the status represents "correct answer"', () => {
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)
    expect(gameManager.status).toBe(gameStatus.CORRECT_ANSWER)
  })

  test('after submitting an incorrect answer, the status represents "incorrect answer"', () => {
    // level 1 can't be failed
    gameManager.submitAnswer(gameManager.generateNextLevel().correctAnswer)

    // fail level 2
    gameManager.submitAnswer(getIncorrectAnswer(gameManager.generateNextLevel()))
    expect(gameManager.status).toBe(gameStatus.INCORRECT_ANSWER)
  })
})