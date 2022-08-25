const ErrorLetters = (props) => {
  const renderErrorLetters = () => {
    const notExist = props.userLetters.filter(
      (letter) =>
        props.word.toLowerCase().includes(letter.toLowerCase()) === false
    );
    // Está a medias
    return notExist.map((letter, index) => {
      return (
        <li className="letter" key={index}>
          {letter}
        </li>
      );
    });
  };
  return (
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">{renderErrorLetters()}</ul>
    </div>
  );
};

export default ErrorLetters;
