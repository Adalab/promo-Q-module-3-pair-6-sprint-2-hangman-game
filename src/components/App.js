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
},[])

//funciones manejadoras

const handleKeyDown = (ev) => {
  // Para que cuando la usuaria escriba una letra, esta se pueda sobreescribir
  ev.target.setSelectionRange(0, 1);
};

  const handleClick = (ev) => {
    ev.preventDefault();
    setNumberOfErrors(numberOfErrors + 1);
  };

  const handleLastLetter = (ev) => {
        if (/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]$/.test(ev.target.value)) {
          setLastLetter(ev.target.value);
          setUserLetters([...userLetters, ev.target.value]);
        }
      };

  //Renderizar cositas

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
     
    return wordLetters.map((letter, index) =>{
      const isExist = userLetters.includes(letter.toLowerCase());
      return <li className="letter" key={index}>{isExist ? letter: ''}</li>;
    })}


    const renderErrorLetters = () =>{
      const notExist = userLetters.filter((letter) =>word.toLowerCase().includes(letter.toLowerCase()) === false);
      // Está a medias
      return 


      // const wordLetters = word.split('');
      // return wordLetters.map((letter, index) =>{
      //   const isNotExist = userLetters.includes(letter.toLowerCase());
      //   return <li className="letter" key={index}>{isNotExist ? '' :letter }</li>;
      // })

    }

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
              {renderErrorLetters()}
              <li className="letter">f</li>
            </ul>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoFocus
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onKeyDown={handleKeyDown}
              onChange={handleLastLetter}
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
