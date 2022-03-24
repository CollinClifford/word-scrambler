import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [sentenceId, setSentenceId] = useState(1);
  const [sentence, setSentence] = useState("");
  const [error, setError] = useState();

  let shuffled = [];
  let tempArray = [];
  let array2 = [];

  // async function loadProfiles(url) {
  //   const response = await fetch(url);
  //   const json = await response.json();
  //   console.log(json);
  //   setSentence(Object.values(json.data).toString());
  // }
  async function loadSentence(url) {
    const abortController = new AbortController();
    setError(null);
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    setSentence(Object.values(json.data).toString());
    return () => abortController.abort();
  }
  useEffect(() => {
    loadSentence(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
  }, []);

  // useEffect(() => {
  //   loadProfiles(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
  // }, []);
  let mutatedWord = "";
  function wordScrambler(sentence) {
    // let mutatedWord = "";
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
    return newSentence;
  }

  return (
    <div className="App">
      <p>{sentence && wordScrambler(sentence)}</p>
    </div>
  );
}

export default App;
