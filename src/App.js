import React, { Component } from 'react';
import sleigh from './sleigh.svg';
import present from './present.svg';
import snow from './snow.svg';
import './App.css';

let numberArray = []
for (let i = 1; i <= 50; i++) {
  numberArray.push(i);
}

// prevent window navigation
window.onbeforeunload = function() {
  return "";
}

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
  }

  pickRandomNumber = () => {
    const shuffledArray = this.shuffle(this.state.availableNumbers)
    const newAvailableNumbers = shuffledArray.slice(1, shuffledArray.length)
 
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
      }
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
      }
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
    } = this.state;

    return (
      <div className="App">
        <h1>KNO's festlige Banko</h1>
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
              // display: display.present,
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
          <span><i>Glædelig jul</i> fra Personaleforeningen, a part of UVdata, a part of KMD.</span>
        </div>
      </div>
    );
  }
}

export default App;
