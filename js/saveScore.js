const isBrowser = typeof window !== 'undefined'

let highScore = isBrowser
  ? parseInt(localStorage.getItem('highScore') ?? '0') || 0
  : 0

export default function saveScore(score) {
  if (score > highScore) {
    highScore = score
    if (isBrowser) {
      localStorage.setItem('highScore', score.toString())
    }
  }
}