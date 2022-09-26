import { useState } from "react";

const musings = [
  "I love bread",
  "Dogs are just better than cats",
  "Pineapple on pizza is a crime",
  "Beep! Boop! I am a robot!",
  "Gotta catch 'em all",
  "Hello world!",
  "A long time ago in a galaxy far, far away...",
  "Luke, I am your father",
  "Oh, hi Mark",
  "Hello darkness my old friend",
  "I am Batman!",
  "You shall not pass!",
  "Zed's dead baby, Zed's dead",
  "Bond. James Bond",
  "Elementary, my dear Watson",
  "Veni, vidi, vici",
  "Mama always said life was like a box of chocolates",
];

const getRandomMusing = () =>
  musings[Math.floor(Math.random() * musings.length)];

const useRandomMusing = () => {
  const [musing, setMusing] = useState(getRandomMusing());
  const randomize = () => setMusing(getRandomMusing());

  return [musing, randomize];
};

export default useRandomMusing;
