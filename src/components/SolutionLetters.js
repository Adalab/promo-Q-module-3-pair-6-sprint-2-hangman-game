const SolutionLetters = (props) =>{
    const renderSolutionLetters = () => {
        const wordLetters = props.word.split('');
         
        return wordLetters.map((letter, index) =>{
          const isExist = props.userLetters.includes(letter.toLowerCase());
          return <li className="letter" key={index}>{isExist ? letter: ''}</li>;
        })}
    return (
        <div className="solution">
            <h2 className="title">Solución:</h2>
            <ul className="letters">
              {renderSolutionLetters()}
            </ul>
          </div>
    )
}

export default SolutionLetters;