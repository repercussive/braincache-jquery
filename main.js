import $ from 'jquery'
import { gameScreen } from './js/screens'
import { GameManager } from './js/gameManager'
import { gameStatus } from './js/_constants'
import sleep from './js/helpers/sleep'

$(() => {
  $('#high-score-display').text(localStorage.getItem('highScore') || 0)
  $('#start-game-button').on('click', startGame)
})

function startGame() {
  $('#app').html(gameScreen)

  new GameManager({
    onGenerateLevel: handleGenerateLevel,
    onSubmitAnswer: handleSubmitAnswer,
    onChangeStatus: handleChangeStatus,
    onChangeScore: handleChangeScore,
    onLoseLife: handleLoseLife
  })
}

function handleGenerateLevel(gameManager) {
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

  selectedButton.removeAttr('data-animation')
  selectedButton.attr('data-variant', isCorrectAnswer ? 'correct' : 'incorrect')
  $('.word-button').attr('disabled', 'true')

  if (isCorrectAnswer === false) {
    findWordButtonByTextContent(gameManager.levelData.correctAnswer).attr('data-variant', 'missed')
  }

  await sleep(gameManager.status === gameStatus.CORRECT_ANSWER ? 750 : 1600)
  $('.word-button').attr('data-animation', 'exit')

  await sleep(400)
  if (gameManager.hasGameEnded) {
    gameManager.handleGameEnd()
  } else {
    gameManager.generateLevel()
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

function findWordButtonByTextContent(word) {
  return $('.word-button').filter(function () {
    return $(this).find('.front').text() === word
  })
}
