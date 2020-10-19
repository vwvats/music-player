// Grabbing elements
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const songs = [
  {
    name: 'sleep-away',
    displayName: 'Sleep Away',
    artist: 'Bob Acri'
  },

  {
    name: 'maid-flaxen-hair',
    displayName: 'Maid with the Flaxen Hair',
    artist: 'Richard Stoltzman'
  }
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `images/${song.name}.jpg`;
}

// Previous and next
let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// On load - select the first song (advanced: random song)
loadSong(songs[songIndex]);

function updateProg(e) {
  if (isPlaying) {
    const {duration, currentTime} = e.srcElement;
    const progPercentage = (currentTime / duration) * 100;
    progress.style.width = `${progPercentage}%`;
    // Displaying lapsed time and duration
    const durMins = Math.floor(duration / 60);
    let durSecs = Math.floor(duration % 60);
    if (durSecs < 10) {
      durSecs = `0${durSecs}`;
    }
    if (durSecs) {
      durationEl.textContent = `${durMins}:${durSecs}`;
    }
    const lapsMins = Math.floor(currentTime / 60);
    let lapsSecs = Math.floor(currentTime % 60);
    if (lapsSecs < 10) {
      lapsSecs = `0${lapsSecs}`;
    }
    if (lapsSecs) {
      currentTimeEl.textContent = `${lapsMins}:${lapsSecs}`;
    }
  }
}

// Set progress bar
function setProgBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => (
  isPlaying ? pauseSong() : playSong()
));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProg);
progContainer.addEventListener('click', setProgBar);
music.addEventListener('ended', nextSong);