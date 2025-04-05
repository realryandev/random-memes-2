// Constants for DRY principle
const COUNTDOWN_DURATION = 3; // Seconds
const MEME_VIDEOS = [
  "https://memes.com", // Replace with actual meme URLs
  "https://www.memedroid.com/memes/random",
  "https://memebase.cheezburger.com/tag/random-memes",
];
const AUDIO_FOLDER = "audio/"; // Folder for audio files

const startButton = document.getElementById("startButton");
const countdownDisplay = document.getElementById("countdownDisplay");

// Function to play audio (KISS principle)
function playAudio(number) {
  const audio = new Audio(`${AUDIO_FOLDER}${number}.mp3`); // Assuming audio files are named 3.mp3, 2.mp3, 1.mp3 etc.
  audio.play();
}

// Function to display countdown (Single Responsibility Principle)
function displayCountdown(count) {
  countdownDisplay.textContent = count > 0 ? count : "GO!";
}

// Function to navigate to a random meme (Single Responsibility Principle)
function navigateToRandomMeme() {
  const randomIndex = Math.floor(Math.random() * MEME_VIDEOS.length);
  window.location.href = MEME_VIDEOS[randomIndex];
}

// Main countdown function (Single Responsibility Principle)
function startCountdown() {
  let count = COUNTDOWN_DURATION;
  displayCountdown(count);
  playAudio(count);

  const interval = setInterval(() => {
    count--;
    displayCountdown(count);
    if (count > 0) {
      playAudio(count);
    } else {
      clearInterval(interval);
      navigateToRandomMeme();
    }
  }, 1000);
}

// Event listener for button click
startButton.addEventListener("click", startCountdown);
