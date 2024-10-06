export const gameScreen = `
<div class="screen">
<p>Score</p>
<div class="mb-2"></div>
<p id="ingame-score-display"><span>0</span></p>
<div class="mb-6"></div>

<div id="lives-container" class="flex-center">
  ${[1, 2, 3].map(() => `
    <div class="life" aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="1.65rem"
      height="1.65rem"
      fill="none"
      style="position: absolute; color: var(--color-life)"
      >
      <path
      d="m4.45 12.9 6.95 6.54c.24.22.36.34.5.36a.5.5 0 0 0 .2 0c.14-.02.26-.14.5-.36l6.95-6.53a5.2 5.2 0 0 0 .55-6.98l-.31-.4a4.31 4.31 0 0 0-7.3.78c-.2.41-.78.41-.98 0a4.31 4.31 0 0 0-7.3-.78l-.3.4a5.2 5.2 0 0 0 .54 6.98Z"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="1.65rem"
        height="1.65rem"
        fill="none"
        style="position: relative; z-index: -1; color: var(--color-life-used)"
      >
        <path
          d="m4.45 12.9 6.95 6.54c.24.22.36.34.5.36a.5.5 0 0 0 .2 0c.14-.02.26-.14.5-.36l6.95-6.53a5.2 5.2 0 0 0 .55-6.98l-.31-.4a4.31 4.31 0 0 0-7.3.78c-.2.41-.78.41-.98 0a4.31 4.31 0 0 0-7.3-.78l-.3.4a5.2 5.2 0 0 0 .54 6.98Z"
          fill="currentColor"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </div>
    `).join('')
  }
</div>

<div class="mb-6"></div>

<div id="word-options">
  <button class="word-button" data-variant="empty" disabled>
    <span class="front"></span>
  </button>
  <button class="word-button" data-variant="empty" disabled>
    <span class="front"></span>
  </button>
  <button class="word-button" data-variant="empty" disabled>
    <span class="front"></span>
  </button>
</div>

<div class="mb-8"></div>
<p id="game-status-text" class="text-box">Select the new word.</p>
</div>`

export const endScreen = `
<div class="screen">
<p aria-hidden style="font-size: 1.5rem">👏</p>
<div class="mb-4"></div>
<div class="text-box accent">That's a wrap!</div>
<div class="mb-7"></div>
<p><span id="score-label" class="pr-2">Your score:</span><span id="score" class="inline-score">?</span></p>
<div class="mb-8"></div>
<button id="play-again-button">
  <span class="front">Play again</span>
</button>
<div class="mb-4"></div>
<button id="home-button"><span class="front">Home</span></button>
</div>
`