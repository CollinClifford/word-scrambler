import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [sentenceId, setSentenceId] = useState(1);
  const [sentence, setSentence] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState();
  const [score, setScore] = useState(0);

  let array2 = [];

  async function loadSentence(url) {
    const abortController = new AbortController();
    setError(null);
    const response = await fetch(url);
    const json = await response.json();
    setSentence(Object.values(json.data).toString());
    return () => abortController.abort();
  }
  useEffect(() => {
    loadSentence(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
  }, []);

  let mutatedWord = "";
  function wordScrambler(sentence) {
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
  function changeHandler({ target }) {
    setAnswer(target.value);
  }
  console.log(answer)

  return (
    <div className="container">
      <h1>{sentence && wordScrambler(sentence)}</h1>
      <p>Guess the sentence! Start typing.</p>
      <p>The yellow blocks are meant for spaces</p>
      <h2>Score: {score}</h2>
      <form>
        {sentence.split("").map((letter, index) => {

          // fix this!!!!
          return (
            <input
              type="text"
              id="index"
              name="letter"
              value={answer}
              onChange={changeHandler}
              max="1"
            ></input>
          );
        })}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

/*
<form action="/action_page.php">
  <label for="fname">First name:</label>
  <input type="text" id="fname" name="fname"><br><br>
  <label for="lname">Last name:</label>
  <input type="text" id="lname" name="lname"><br><br>
  <input type="submit" value="Submit">
</form>
*/

export default App;
