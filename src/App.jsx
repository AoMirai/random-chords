import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chord: ["C", "D", "E", "F", "G", "A", "B"],
      sharp: ["#", ""],
      modif: ["m", "", "7", "9"],
      history: [],
      currentChords: [],
      num: 1,
      perMin: 20,
      perMaj: 50,
      per7: 20,
      per9: 10
    };
  }

  componentDidMount() {
    let storage = window.localStorage;
    let chords = storage.getItem('chords');
    if (chords) {
      this.setState({ history: JSON.parse(chords) });
      this.displayHistory(JSON.parse(chords));
    }
  }

  handleNumChange = (event) => {
    this.setState({ num: event.target.value });
  }

  handleChangePer= (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  }

  generateChords = () => {
    let chords = [];
    let modif = this.state.modif;
    modif.push(...Array(this.state.perMin-1).fill("m"));
    modif.push(...Array(this.state.perMaj-1).fill(""));
    modif.push(...Array(this.state.per9-1).fill("9"));
    modif.push(...Array(this.state.per7-1).fill("7"));
    for (let i = 0; i < this.state.num; i++) {
      let chord = this.state.chord[Math.floor(Math.random() * this.state.chord.length)];
      chord += this.state.sharp[Math.floor(Math.random() * this.state.sharp.length)];
      chord += modif[Math.floor(Math.random() * this.state.modif.length)];
      chords.push(chord);
    }
    this.setState(
      prevState => ({ currentChords: chords, history: [chords, ...prevState.history] }),
      () => {
        let storage = window.localStorage;
        storage.setItem('chords', JSON.stringify(this.state.history));
        this.displayChords(chords);
        this.displayHistory(this.state.history);
      }
    );
  }

  displayChords = (chords) => {
    let result = document.getElementById("result");
    result.innerHTML = "";
    result.className = "result-item";
    chords.forEach(chord => {
      let div = document.createElement("div");
      div.innerHTML = chord;
      result.appendChild(div);
    });
  }

  displayHistory = (history) => {
    let historyDiv = document.getElementById("history");
    historyDiv.innerHTML = "";
    history.forEach(chords => {
      if (chords !== this.state.currentChords) {
        let div = document.createElement("div");
        div.className = "history-item";
        chords.forEach(chord => {
          let div2 = document.createElement("div");
          div2.innerHTML = chord;
          div.appendChild(div2);
        });
        historyDiv.appendChild(div);
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Random chords</h1>
        <div className='container'>
          <div className='void'></div>
          <div className='content'>
            <div className='generate'>
              <div>
                <label>Number of chords:  </label>
                <input value={this.state.num} onChange={this.handleNumChange} type="number" id="chords" name="chords" min="1" max="8"></input>
              </div>
              <div>
                <label htmlFor="perMaj">%M: </label>
                <input type="text" onChange={this.handleChangePer} value={this.state.perMaj} name='perMaj' />
              </div>
              <div>
                <label htmlFor="perMin">%m: </label>
                <input type="text" onChange={this.handleChangePer} value={this.state.perMin} name='perMin' />
              </div>
              <div>
                <label htmlFor="per7">%7: </label>
                <input type="text" onChange={this.handleChangePer} value={this.state.per7} name='per7' />
              </div>
              <div>
                <label htmlFor="per9">%9: </label>
                <input type="text" onChange={this.handleChangePer} value={this.state.per9} name='per9' />
              </div>
              <div>
                <button onClick={this.generateChords}>Generate</button>
              </div>
              </div>
              <div className='result'>
                <div>Result:</div>
                <div id="result"></div>
              </div>
            
            <div className='history'>History:</div>
            <div id="history"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
