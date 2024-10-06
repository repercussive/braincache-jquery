import $ from 'jquery'
import { endScreen, gameScreen } from './js/screens'
import { GameManager } from './js/gameManager'
import { gameStatus } from './js/_constants'
import sleep from './js/helpers/sleep'

let welcomeScreen

$(() => {
  welcomeScreen = $('#app').html()
  setupWelcomeScreen()
})

function setupWelcomeScreen() {
  $('.inline-score').text(localStorage.getItem('highScore') || 0)
  $('#start-game-button').on('click', startGame)
}

function startGame() {
  $('#app').html(gameScreen)

  new GameManager({
    onGenerateNextLevel: handleGenerateNextLevel,
    onSubmitAnswer: handleSubmitAnswer,
    onChangeStatus: handleChangeStatus,
    onChangeScore: handleChangeScore,
    onLoseLife: handleLoseLife,
    onGameEnd: handleGameEnd
  })
}

function handleGenerateNextLevel(gameManager) {
  $('.word-button').attr('data-animation', 'enter')

  gameManager.levelData.options.forEach((word, index) => {
    const wordButton = $('.word-button').eq(index)
    wordButton.find('.front').text(word)
    wordButton.removeAttr('disabled')
    wordButton.attr('data-variant', '')
    wordButton.off('click').on('click', () => gameManager.submitAnswer(word))
  })
}

async function handleSubmitAnswer(gameManager) {
  const isCorrectAnswer = gameManager.status === gameStatus.CORRECT_ANSWER
  const selectedButton = findWordButtonByTextContent(gameManager.lastSubmittedAnswer)

  $('.word-button').attr('disabled', 'true')

  selectedButton.removeAttr('data-animation')
  selectedButton.attr('data-variant', isCorrectAnswer ? 'correct' : 'incorrect')

  if (isCorrectAnswer === false) {
    findWordButtonByTextContent(gameManager.levelData.correctAnswer).attr('data-variant', 'missed')
  }

  await sleep(isCorrectAnswer ? 750 : 1600)
  $('.word-button').attr('data-animation', 'exit')

  await sleep(400)
  if (gameManager.readyToEndGame) {
    gameManager.endGame()
  } else {
    gameManager.generateNextLevel()
  }
}

function handleChangeStatus(gameManager) {
  const message = {
    [gameStatus.AWAIT_USER_ANSWER]: 'Select the new word',
    [gameStatus.CORRECT_ANSWER]: 'Nice!',
    [gameStatus.INCORRECT_ANSWER]: 'You\'ve seen that before.'
  }[gameManager.status]

  $('#game-status-text').text(message)
}

async function handleChangeScore(gameManager) {
  const scoreElement = $('#ingame-score-display span')
  await sleep(750)
  scoreElement.css({ animation: 'slide-out forwards 400ms' })
  await sleep(400)
  scoreElement.text(gameManager.score)
  scoreElement.css({ animation: 'slide-in forwards 400ms' })
}

function handleLoseLife(gameManager) {
  $('.life').eq(gameManager.lives)
    .find('svg').first()
    .css({ animation: 'lose-life forwards 400ms' })
}

function handleGameEnd(gameManager) {
  $('#app').html(endScreen)

  $('.inline-score').text(gameManager.score)
  if (gameManager.score === (Number(localStorage.getItem('highScore')) ?? 0)) {
    $('#score-label').text('High score!')
  }

  $('#play-again-button').on('click', startGame)
  $('#home-button').on('click', () => {
    $('#app').html(welcomeScreen)
    setupWelcomeScreen()
  })
}

function findWordButtonByTextContent(word) {
  return $('.word-button').filter(function () {
    return $(this).find('.front').text() === word
  })
}
