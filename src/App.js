import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [sentenceId, setSentenceId] = useState(1);
  const [sentence, setSentence] = useState("");

  let shuffled = [];
  let tempArray = [];
  let array2 = [];
  useEffect(() => {
    async function loadProfiles(url) {
      const response = await fetch(url);
      const json = await response.json();
      setSentence(Object.values(json.data).toString());
    }
    loadProfiles(`https://api.hatchways.io/assessment/sentences/${sentenceId}`);
  }, [sentenceId]);

  function wordScrambler(sentence) {
    console.log(sentence);
    let array = sentence.split(" ");
    for (let i = 0; i < array.length; i++) {
      if (array[i].length > 2) {
        array2 = array[i].split("");
        // console.log(array2);
        for (let j = 1; j < array2.length - 1; j++) {
          tempArray.push(array2[j]);
          // tempArray = tempArray.sort(() => Math.random() - 0.5);
          // console.log(tempArray);
        }
        shuffled.push(array2[0], ...tempArray, array2[array2.length - 1]);
      } else {
        shuffled.push(array[i]);
      }
    }
    console.log(shuffled.join(""));
    // return sentence.split(" ").forEach((word) => {
    // if (word.length > 2) {
    // word = word
    //   .split("")
    //   .sort(() => Math.random() - 0.5)
    //   .join("");
    // return word;
    // for (let i = 1; i < word.length - 1; i++) {
    //   shuffled.push(word[i]);
    //   shuffled = shuffled.sort(() => Math.random() - 0.5);
    // }
    // shuffled.unshift(word[0]);
    // shuffled.push(word[word.length - 1]);
    // return word;
    // console.log(word);
    //   return word;
    // } else {
    // return word;
    // }
    // });
    // return sentence;
  }

  if (sentence) {
    wordScrambler(sentence);
  }

  return (
    <div className="App">
      <p>{sentence && wordScrambler(sentence)}</p>
    </div>
  );
}

export default App;
