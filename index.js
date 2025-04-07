// New

// Constants for DRY principle
const COUNTDOWN_DURATION = 3; // Seconds
const MEME_VIDEOS = [
  "https://memes.com", // Replace with actual meme URLs
  "https://www.memedroid.com/memes/random",
  "https://memebase.cheezburger.com/tag/random-memes",
];
const AUDIO_FOLDER = "audio/"; // Folder for audio files

// Make sure the audio files 3.mp3, 2.mp3, 1.mp3 exist in this folder relative to your HTML file.

const startButton = document.getElementById("startButton");
// Ensure this targets the new div, not the old span
const countdownDisplay = document.getElementById("countdownDisplay");

// Function to play audio (KISS principle)
function playAudio(number) {
  // Consider adding error handling in case the audio file doesn't load
  try {
    const audio = new Audio(`${AUDIO_FOLDER}${number}.mp3`); // Assuming audio files are named 3.mp3, 2.mp3, 1.mp3 etc.
    audio.play();
  } catch (error) {
    console.error(`Error playing audio for ${number}:`, error);
    // Optionally display an error to the user
  }
}

// Function to display countdown (Single Responsibility Principle)
function displayCountdown(count) {
  // Clear previous content first
  countdownDisplay.textContent = "";
  // Use a slight delay to ensure content clears before adding new, avoids flicker
  requestAnimationFrame(() => {
    if (count > 0) {
      countdownDisplay.textContent = count;
    } else if (count === 0) {
      // Specifically check for 0 to show GO!
      countdownDisplay.textContent = "GO!";
    }
    // If count < 0 (shouldn't happen with current logic, but good practice), display remains empty.
  });
}

// Function to navigate to a random meme (Single Responsibility Principle)
function navigateToRandomMeme() {
  const randomIndex = Math.floor(Math.random() * MEME_VIDEOS.length);
  window.location.href = MEME_VIDEOS[randomIndex];
}

// Main countdown function (Single Responsibility Principle)
function startCountdown() {
  // --- Improvement: Disable button ---
  startButton.disabled = true;
  startButton.style.cursor = "not-allowed"; // Visual feedback

  let count = COUNTDOWN_DURATION;
  displayCountdown(count); // Display initial number (e.g., 3)
  playAudio(count); // Play initial audio (e.g., 3.mp3)

  const interval = setInterval(() => {
    count--;
    displayCountdown(count); // Display next number (2, 1, GO!)

    if (count > 0) {
      playAudio(count); // Play next audio (2.mp3, 1.mp3)
    } else {
      // count is 0 or less
      clearInterval(interval);
      // --- Improvement: Delay before navigation ---
      setTimeout(() => {
        navigateToRandomMeme();
        // Optional: Re-enable button if navigation fails or is cancelled,
        // but usually not needed if navigation is successful.
        // startButton.disabled = false;
        // startButton.style.cursor = 'pointer';
      }, 500); // Wait 500ms after showing "GO!" before navigating
    }
  }, 1000); // Interval of 1 second
}

// Event listener for button click
startButton.addEventListener("click", startCountdown);

// Optional: Preload audio for smoother playback (especially on slower connections)
function preloadAudio() {
  for (let i = 1; i <= COUNTDOWN_DURATION; i++) {
    const audio = new Audio(`${AUDIO_FOLDER}${i}.mp3`);
    audio.preload = "auto"; // Hint to the browser to load it
  }
}

// Call preload when the page loads
window.addEventListener("load", preloadAudio);
