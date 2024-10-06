export default function getRandomArrayItem(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}