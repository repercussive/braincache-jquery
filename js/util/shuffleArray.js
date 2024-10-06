/**
 * Shuffles an array (in place) using the Durstenfeld algorithm.
 * @param array The array to shuffle.
 */
export default function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}