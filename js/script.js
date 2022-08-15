const time =document.querySelector('.time');
const dates =document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('.body');
let name = document.querySelector('.name');
let randomNum = getRandomNum(1, 20);
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
let city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
let counter = 0;



function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
    showDate();
    showGreeting();
  }
  showTime();

  function showDate() {
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric' };
    const currentDate = date.toLocaleDateString('en-Uk', options);
    dates.textContent = currentDate;
  }

  function getTimeOfDay(){
    const date = new Date();
    const hours = date.getHours();
    if (hours >=6 && hours < 12) {
       return 'morning';
    } else if (hours >= 12 && hours < 18) {
        return 'afternoon';
    } else if (hours >= 18 && hours < 0){
        return 'evening';
    } else if (hours >= 0 && hours < 6){
        return 'night';
    }
  }
  function showGreeting(){
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`;
    greeting.textContent = greetingText;
  }

  // START Save local storage set//
  function setLocalStorage() {
    localStorage.setItem('name', name.value);
    localStorage.setItem('city', city.value);
  }
  window.addEventListener('beforeunload', setLocalStorage);
    //END Save local storage set//

// START Save local storage get//
  function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
    getWeather();
  }
  window.addEventListener('load', getLocalStorage);
  //END Save local storage get//

  //START Slider//
  function getRandomNum (min, max){
    let rand = min + Math.random()*(max-min);
    return Math.round(rand);
  }

  function setBg (){
    const timeOfDay = getTimeOfDay();
    const bgNum = randomNum.toString().padStart(2, "0");
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage = `url(${img.src})`;
    };
}


function getSlideNext() {
    if(randomNum ==20){
        randomNum = 1 ;
    } else randomNum = randomNum + 1;
    setBg ();
}

function getSlidePrev() {
    if(randomNum ==1){
        randomNum = 20 ;
    } else randomNum = randomNum - 1;
    setBg ();
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
  //END Slider//

  //START Weather//
  async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=de1f478ed2d31ca1f1beb68094f49e30&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
  
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
  }
    
    city.addEventListener('change', getWeather);
  //END Weather//

  //START Quotes//
    async function getQuotes() {  
    const quotes = '../assets/json/data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    if (counter < 2){
        counter = counter + 1;
    } else counter = 0;

    author.textContent = data[counter].author;
    quote.textContent = data[counter].text;
  }
  getQuotes();

  changeQuote.addEventListener('click', getQuotes);

  //END Quotes//

  //START Audio//


const play = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');
let isPlay = false;

import playList from '../js/playList.js';

console.log(playList);

const audio = new Audio();
let playNum = 0;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if(!isPlay){
    audio.play();
    isPlay = true;
    play.classList.toggle('pause');}
  else {
    audio.pause();
    isPlay = false;
    play.classList.toggle('pause');
  }
}

function playNext() {
    if(playNum == 3){
        playNum = 0 ;
    } else playNum = playNum + 1;
    playAudio();
}

function playPerv() {
    if(playNum == 0){
        playNum = 3 ;
    } else playNum = playNum - 1;
    playAudio();
}


      for(let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
              li.classList.add('play-item');
              li.textContent = playList[i].title;
              playListContainer.append(li);
      }



play.addEventListener('click', playAudio);
playNextBtn.addEventListener('click', playNext);
playPrevBtn.addEventListener('click', playPerv);

  //END Audio//