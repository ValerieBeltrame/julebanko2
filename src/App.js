import React, { Component } from 'react';
import sleigh from './sleigh.svg';
import present from './present.svg';
import snow from './snow.svg';
import './App.css';
import Sound from 'react-sound';

import glitter from './audio/glitter.mp3'

import weWish1 from './audio/1.mp3'
import weWish2 from './audio/2.mp3'
import weWish3 from './audio/3.mp3'
import weWish4 from './audio/4.mp3'
import weWish5 from './audio/5.mp3'
import weWish6 from './audio/6.mp3'
import weWish7 from './audio/7.mp3'

import jb1 from './audio/jb1.mp3'
import jb2 from './audio/jb2.mp3'
import jb3 from './audio/jb3.mp3'
import jb4 from './audio/jb4.mp3'
import jb5 from './audio/jb5.mp3'
import jb6 from './audio/jb6.mp3'
import jb7 from './audio/jb7.mp3'
import jb8 from './audio/jb8.mp3'

import sn1 from './audio/sn1.mp3'
import sn2 from './audio/sn2.mp3'
import sn3 from './audio/sn3.mp3'
import sn4 from './audio/sn4.mp3'
import sn5 from './audio/sn5.mp3'
import sn6 from './audio/sn6.mp3'
import sn7 from './audio/sn7.mp3'
import sn8 from './audio/sn8.mp3'
import sn9 from './audio/sn9.mp3'
import sn10 from './audio/sn10.mp3'
import sn11 from './audio/sn11.mp3'
import sn12 from './audio/sn12.mp3'

let numberArray = []
for (let i = 1; i <= 90; i++) {
  numberArray.push(i);
}

// prevent window navigation
window.onbeforeunload = function() {
  return "";
}

const sound = [
  weWish1,
  weWish2,
  weWish3,
  weWish4,
  weWish5,
  weWish6,
  weWish7,
  jb1,
  jb2,
  jb3,
  jb4,
  jb5,
  jb6,
  jb7,
  jb8,
  sn1,
  sn2,
  sn3,
  sn4,
  sn5,
  sn6,
  sn7,
  sn8,
  sn9,
  sn10,
  sn11,
  sn12,
]

class App extends Component {
  state = {
    usedNumbers: [],
    availableNumbers: numberArray,
    currentNumber: null,
    animations: {
      button: null,
      sleigh: null,
      present: null,
    },
    opacity: {},
    display: {},
    playStatus: {
      song: 'STOPPED',
      glitter: 'STOPPED',
    },
    soundNumber: -1,
  }

  pickRandomNumber = () => {
    const shuffledArray = this.shuffle(this.state.availableNumbers)
    const newAvailableNumbers = shuffledArray.slice(1, shuffledArray.length)
    const soundNumber = this.state.soundNumber < sound.length -1 ? this.state.soundNumber + 1 : 0
 
    this.setState({
      currentNumber: shuffledArray[0],
      availableNumbers: newAvailableNumbers,
      animations: {
        button: 'buttonHide 2s',
        sleigh: 'sleighpath 4s ease 0s forwards',
        present: 'presentgrowth 2s ease-in 3.2s',
        number: 'numberAppear 2s ease-in 5.2s',
      },
      display: {
        present: 'block',
        number: 'block',
      },
      playStatus: {
        song: 'PLAYING',
        glitter: 'STOPPED',
      },
      soundNumber,
    })

    setTimeout(() => {
      this.setState({
        opacity: {
          button: 0
        },
        display: {
          present: 'block',
          number: 'block',
          button: 'none',
        }
      })
    }, 1000)

    setTimeout(() => {
      this.setState({
        opacity: {
          button: 0,
          number: 1,
        },
      })
    }, 5500)


  }

  shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  resetAnimations = () => {
    const newUsedNumbers = this.state.usedNumbers.slice();
    newUsedNumbers.push(this.state.currentNumber);
    this.setState({
      usedNumbers: newUsedNumbers,
      animations: {
        button: 'buttonAppear 1s',
        sleigh: '',
        present: '',
        number: 'numberHide 1s',
      },
      display: {
        present: 'none',
        number: 'block',
        button: 'inline',
      },
      opacity: {
        button: 1
      },
      playStatus: {
        song: 'STOPPED',
        glitter: 'PLAYING',
      },
    })

    setTimeout(() => {
      this.setState({
        display: {
          present: 'none',
          number: 'none',
          button: 'inline',
        }
      })
    }, 1000)
  }

  render() {

    const {
      usedNumbers,
      animations,
      opacity,
      currentNumber,
      display,
      playStatus,
      soundNumber,
    } = this.state;

    let speed;
    if (-1 < soundNumber && soundNumber <= 6) {
      speed = 1.4
    } else if (soundNumber > 6 && soundNumber <= 14) {
      speed = 2.1
    } else if (soundNumber > 14 && soundNumber <= 26) {
      speed = 1.5
    }

    return (
      <div className="App">
        <h1>Den festlige julebanko</h1>
        <button
          className="pickButton"
          onClick={this.pickRandomNumber}
          style={{
            animation: animations.button,
            opacity: opacity.button,
            display: display.button,
          }}>Go!</button>
        <div className="numberContainer">
          <div>
          <span
            onClick={this.resetAnimations}
            className="number"
            style={{
              animation: animations.number,
              opacity: opacity.number,
              display: display.number,
            }}
          >
            {currentNumber}
          </span>
          <span 
            className="present"
            style={{
              animation: animations.present,
            }} >
          <img
            src={present}
          />
          </span>
          </div>
        </div>
        <img src={sleigh} id="sleigh" style={{ animation: animations.sleigh }} />
        <div className="side">
          {
            usedNumbers.map((number) => (
              <div className="sideNumber">{number}</div>
            ))
          }
        </div>
        <div className="bottom">
          <img src={snow} />
          <span><i>Glædelig jul og godt nytår!</i></span>
        </div>
        <Sound url={glitter} playStatus={playStatus.glitter} playbackRate={2.7}/>
        <Sound url={sound[soundNumber]} playStatus={playStatus.song} playbackRate={speed}/>
      </div>
    );
  }
}

export default App;
