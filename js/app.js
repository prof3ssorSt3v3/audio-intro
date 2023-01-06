const APP = {
  audio: new Audio(), //create an Audio element in memory
  currentTrack: 0,
  tracks: ['die-to-live.mp3', 'shes-kerosene.mp3', 'american-idiot.mp3'],
  init() {
    //page is loaded
    APP.addDOMListeners();
    APP.addAudioListeners();
  },
  addDOMListeners() {
    //DOM events
    document.getElementById('btnLoad').addEventListener('click', APP.load);
    document.getElementById('btnPlay').addEventListener('click', APP.startPlay);
    document.getElementById('btnPause').addEventListener('click', APP.pausePlay);
    document.getElementById('btnNext').addEventListener('click', APP.next);
    document.querySelector('.progress').addEventListener('click', APP.doSeek);

    //page listener
    window.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') {
        //entering the page
        if (APP.wasPlaying) {
          APP.startPlay();
        }
      } else {
        //leaving the page
        APP.wasPlaying = !APP.audio.paused;
        APP.pausePlay();
      }
    });
  },
  addAudioListeners() {
    //Audio Events
    APP.audio.addEventListener('error', APP.audioError);
    APP.audio.addEventListener('ended', APP.ended);
    APP.audio.addEventListener('loadstart', APP.loadstart);
    APP.audio.addEventListener('loadedmetadata', APP.loadedmetadata);
    APP.audio.addEventListener('canplay', APP.canplay);
    APP.audio.addEventListener('durationchange', APP.durationchange);
    APP.audio.addEventListener('timeupdate', APP.timeupdate);
    APP.audio.addEventListener('play', APP.play);
    APP.audio.addEventListener('pause', APP.pause);
  },
  load(andPlay = false) {
    //load the currentTrack track
    APP.audio.src = `./media/${APP.tracks[APP.currentTrack]}`;
    console.log(APP.audio.src, 'has been loaded');
    // console.log(andPlay instanceof Event);
    andPlay && !(andPlay instanceof Event) && APP.startPlay();
  },
  startPlay() {
    //play the loaded track
    if (APP.audio.src) {
      APP.audio.play();
    } else {
      console.warn('Load a track first');
    }
  },
  pausePlay() {
    //pause the loaded track
    APP.audio && APP.audio.pause();
  },
  next() {
    //stop the currentTrack and load the next one
    APP.currentTrack++;
    if (APP.currentTrack >= APP.tracks.length) APP.currentTrack = 0;
    APP.load(true);
  },
  doSeek(ev) {
    if (APP.audio.src) {
      let x = ev.x;
      let w = ev.currentTarget.clientWidth;
      let pct = x / w;
      APP.audio.currentTime = pct * APP.audio.duration;
    }
  },
  audioError(ev) {
    //error in the loading of a track
    console.warn(APP.audio.src, 'has an error and will not load.');
  },
  ended(ev) {
    //end of a track has been reached
    console.log('end of track reached');
    APP.next();
  },
  loadstart(ev) {
    //a load has begun
    console.log('load starting');
  },
  loadedmetadata(ev) {
    //meta data has been loaded
    console.log('we have all the meta data');
  },
  canplay(ev) {
    //enough audio loaded to start playing
    console.log('enough audio loaded to start playing');
  },
  durationchange(ev) {
    //value for duration has changed
    console.log(ev.type);
    document.getElementById('total').textContent = APP.audio.duration;
    document.getElementById('title').textContent = APP.tracks[APP.currentTrack].replaceAll('-', ' ');
  },
  timeupdate(ev) {
    //current position in the track has changed while playing
    console.log(ev.type);
    document.getElementById('current').textContent = APP.audio.currentTime;
    APP.showPct();
  },
  showPct() {
    let pct = APP.audio.currentTime / APP.audio.duration;
    let pctTxt = (pct * 100).toFixed(2);
    document.getElementById('pctPlay').textContent = `${pctTxt}%`;
    let w = parseInt(document.querySelector('.progress').clientWidth);
    document.querySelector('.progress .bar').style.width = `${pct * w}px`;
    document.querySelector('.progress .bar').style.height = `${pct * w}px`;
  },
  play(ev) {
    //track has started to play
    document.body.classList.add('isPlaying');
  },
  pause(ev) {
    //track has been paused
    document.body.classList.remove('isPlaying');
  },
};

document.addEventListener('DOMContentLoaded', APP.init);
