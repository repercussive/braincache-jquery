export const welcomeScreen = `
<div class="screen">
<header class="flex-center flex-column">
  <span aria-hidden="true">🧠</span>
  <h1>brain<span>cache</span></h1>
</header>
<div class="mb-4"></div>
<div class="text-box">
  <p>How many words can you hold in your head?</p>
</div>
<div class="mb-7"></div>
<p>
  <span class="pr-1">Your best score:</span>
  <span id="high-score-display">?</span>
</p>
<div class="mb-7"></div>
<div id="rules" class="text-box accent">
  <ul>
    <li>Words will appear on the screen.</li>
    <li>Select the one you haven't seen.</li>
    <li>
      Don't select any words that you've seen before, or you'll lose a
      life.
    </li>
    <li>Most people score somewhere between 50 and 200.</li>
  </ul>
</div>
<div class="mb-6"></div>
<button id="start-game-button"><span class="front">Start</span></button>
</div>
`

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