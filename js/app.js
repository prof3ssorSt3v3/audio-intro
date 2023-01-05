const APP = {
  audio: null,
  currentTrack: 0,
  tracks: ['die-to-live.mp3', 'shes-kerosene.mp3', 'american-idiot.mp3'],
  init() {
    //page is loaded
    //create an Audio element in memory
  },
  addListeners() {
    document.getElementById('btnLoad').addEventListener('click', APP.load);
    document.getElementById('btnPlay').addEventListener('click', APP.play);
    document.getElementById('btnPause').addEventListener('click', APP.pause);
    document.getElementById('btnNext').addEventListener('click', APP.next);
  },
  load() {
    //load the currentTrack track
  },
  play() {
    //play the loaded track
  },
  pause() {
    //pause the loaded track
  },
  next() {
    //stop the currentTrack and load the next one
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
