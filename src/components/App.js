import { useState, useEffect } from 'react';
import '../styles/App.scss';
import callToApi from '../services/callToApi';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';

function App() {
  //Variables de estado
  const [lastLetter, setLastLetter] = useState('');
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);

  //fetch

  useEffect(() => {
    callToApi().then((word) => {
      setWord(word);
    });
  }, []);

  //funciones manejadoras

  const handleKeyDown = (ev) => {
    // Para que cuando la usuaria escriba una letra, esta se pueda sobreescribir
    ev.target.setSelectionRange(0, 1);
  };

  const handleLastLetter = (ev) => {
    if (/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü]$/.test(ev.target.value)) {
      setLastLetter(ev.target.value);
      setUserLetters([...userLetters, ev.target.value]);
    }
  };

  //Renderizar cositas

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  //Pintado del HTML

  return (
    <div className="page">
      <Header />
      <main className="main">
        <section>
          <SolutionLetters word={word} userLetters={userLetters} />
          <ErrorLetters word={word} userLetters={userLetters}></ErrorLetters>

          {/*        <form className="form">
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
          </form> */}
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()} />
      </main>
    </div>
  );
}

export default App;
