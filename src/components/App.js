import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from "../services/callToApi";

function App() {

//Variables de estado
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);

//fetch

useEffect(()=>{
  callToApi()
  .then((word)=>{
    setWord(word)
  })
})

//funciones manejadoras

const handleKeyDown = (ev) => {
  // Para que cuando la usuaria escriba una letra, esta se pueda sobreescribir
  ev.target.setSelectionRange(0, 1);
};

  const handleClick = (ev) => {
    ev.preventDefault();
    setNumberOfErrors(numberOfErrors + 1);
  };

  const handleLetter = (ev) => {
    ev.preventDefault();
    setLastLetter(ev.currentTarget.value);
    if (ev.currentTarget.value.search(/[a-zñA-ZÑÁÉÍÓÚáéíóú]/) === -1) {
      setLastLetter('');
    }
  };

  //Renderizar cositas

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    const wordLettersResult =  wordLetters.map (
        (letter)=> <li className="letter">{letter}</li>)
        return wordLettersResult
    }


    const handleLastLetter = (ev) => {
      if (/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]$/.test(ev.target.value)) {
        setLastLetter(ev.target.value);
        setUserLetters([...userLetters, ev.target.value]);
      }
    };
  


  //Pintado del HTML

  return (
    <div className="page">
      <header>
        <h1 className="header__title">Juego del ahorcado</h1>
      </header>
      <main className="main">
        <section>
          <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
          <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">
              <li className="letter">f</li>
              <li className="letter">q</li>
              <li className="letter">h</li>
              <li className="letter">p</li>
              <li className="letter">x</li>
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoFocus
              autocomplete="off"
              className="form__input"
              maxlength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onKeyDown={handleKeyDown}
              onChange={handleLetter}
            />
            <button onClick={handleClick}>Incrementar</button>
          </form>
        </section>
        <section className={`dummy error-${numberOfErrors}`}>
          <span className="error-13 eye"></span>
          <span className="error-12 eye"></span>
          <span className="error-11 line"></span>
          <span className="error-10 line"></span>
          <span className="error-9 line"></span>
          <span className="error-8 line"></span>
          <span className="error-7 line"></span>
          <span className="error-6 head"></span>
          <span className="error-5 line"></span>
          <span className="error-4 line"></span>
          <span className="error-3 line"></span>
          <span className="error-2 line"></span>
          <span className="error-1 line"></span>
        </section>
      </main>
    </div>
  );
}

export default App;
