import hitViewer from "/assets/audio/viewer.mp3";
import hitReviewer from "/assets/audio/reviewer.mp3";
import winSound from "/assets/audio/win.mp3";
import loseSound from "/assets/audio/lose.mp3";
import backgroundSound from "/assets/audio/silence.wav";

export let isMuted = false;

const sounds = {
  hitViewer: new Audio(hitViewer),
  hitReviewer: new Audio(hitReviewer),
  winSound: new Audio(winSound),
  loseSound: new Audio(loseSound),
  backgroundSound: new Audio(backgroundSound),
};

export function playSound(soundName) {
  if (!isMuted) {
    const sound = sounds[soundName];
    if (sound) {
      sound.play();
    }
  }
}

export function playBackgroundSound() {
  if (!isMuted) {
    const background = audioFiles.background;
    background.loop = true;
    background.volume = 0.5;
    background.play();
  }
}

export function stopBackgroundSound() {
  const background = audioFiles.background;
  if (background) {
    background.pause();
    background.currentTime = 0;
  }
}
