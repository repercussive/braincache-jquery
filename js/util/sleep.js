export default async function sleep(timeMs) {
  await new Promise((resolve) => setTimeout(resolve, time))
}