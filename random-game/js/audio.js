import hitViewer from "/assets/audio/viewer.mp3";
import hitReviewer from "/assets/audio/reviewer.mp3";
import backgroundSound from "/assets/audio/silence.mp3";
import notification from "/assets/audio/notification.mp3";

export let isMuted = false;

const sounds = {
  hitViewer: new Audio(hitViewer),
  hitReviewer: new Audio(hitReviewer),
  backgroundSound: new Audio(backgroundSound),
  notification: new Audio(notification),
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
    const background = sounds.backgroundSound;
    background.loop = true;
    background.volume = 0.1;
    background.play();
  }
}

export function stopBackgroundSound() {
  const background = sounds.backgroundSound;
  if (background) {
    background.pause();
    background.currentTime = 0;
  }
}
