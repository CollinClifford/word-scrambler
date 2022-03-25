import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [sentenceId, setSentenceId] = useState(1);
  let [sentence, setSentence] = useState("");
  const [answer, setAnswer] = useState([]);
  let [score, setScore] = useState(0);

  let array2 = [];

  async function loadSentence(url) {
    const abortController = new AbortController();
    const response = await fetch(url);
    const json = await response.json();
    setSentence(Object.values(json.data).toString());
    return () => abortController.abort();
  }
  useEffect(() => {
    loadSentence(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
  });

  function wordScrambler(sentence) {
    let mutatedWord = "";
    let newSentence = "";
    let array = sentence.split(" ");
    for (let i = 0; i < array.length; i++) {
      array2 = array[i].split("");
      if (array2.length <= 2) {
        mutatedWord = array2.join("");
      } else if (array2.length > 2) {
        let firstLetter = array2[0];
        let lastLetter = array2[array2.length - 1];
        let mutableArray = array2;
        mutableArray.pop();
        mutableArray.shift();
        mutableArray.sort(() => Math.random() - 0.5);
        let middle = mutableArray.join("");
        mutatedWord = firstLetter + middle + lastLetter;
      }
      newSentence += mutatedWord + " ";
    }
    return newSentence.trim();
  }

  function changeHandler(value, index) {
    if (answer.length >= 1) {
      setAnswer((previousAnswer) => [...previousAnswer, value]);
    } else {
      setAnswer(value);
    }
  }

  const scrambledSentence = wordScrambler(sentence);

  function submitHandler(event) {
    event.preventDefault();
    if (
      answer.join("").toLowerCase() ===
      sentence.split(" ").join("").toLowerCase()
    ) {
      setSentenceId(sentenceId++);
      setScore(score++);
    } else {
      alert("Try again");
    }
  }

  return (
    <div className="container">
      <h1>{scrambledSentence}</h1>
      <p>Guess the sentence! Start typing.</p>
      <p>The yellow blocks are meant for spaces</p>
      <h2>Score: {score}</h2>
      <form onSubmit={submitHandler}>
        {sentence.split("").map((letter, index) => {
          if (letter === " ") {
            return (
              <>
                <input
                  type="text"
                  id={index}
                  name="letter"
                  className="space"
                  disabled
                  maxLength="1"
                ></input>
                <br />
              </>
            );
          } else {
            return (
              <input
                type="text"
                id={index}
                name="letter"
                value={letter[index]}
                onChange={(event) => changeHandler(event.target.value, index)}
                maxLength="1"
              ></input>
            );
          }
        })}
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
