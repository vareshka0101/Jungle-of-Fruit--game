import React, { useState } from "react";
import Fruit from "./Fruit.jsx";
import fruitTypes from "./fruit.js";
import styles from "./game.module.css";

import gameSound from "./sound/d6b8a8f21491d95.mp3";

const audio = new Audio(gameSound);
let fruitSpawnInterval = null;

function Game() {
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const addFruit = () => {
    const randomFruitType =
      fruitTypes[Math.floor(Math.random() * fruitTypes.length)];

    const gameWidth = 500;
    const gameHeight = 280;
    const fruitSize = 60;

    const newFruit = {
      id: Math.random(),
      type: randomFruitType,
      x: Math.random() * (gameWidth - fruitSize),
      y: Math.random() * (gameHeight - fruitSize),
    };

    setFruits((prevFruits) => [...prevFruits, newFruit]);

    setTimeout(() => {
      setFruits((prevFruits) => prevFruits.filter((f) => f.id !== newFruit.id));
    }, 3000);
  };

  const handleFruitClick = (id, points) => {
    setScore((prevScore) => prevScore + points);
    setFruits((prevFruits) => prevFruits.filter((fruit) => fruit.id !== id));

    audio.currentTime = 0;
    audio
      .play()
      .catch((e) => console.error("Not a sound", e));
  };

  const startGame = () => {
    if (!gameStarted) {
      setGameStarted(true);
      fruitSpawnInterval = setInterval(() => {
        addFruit();
      }, 2000);
    }
  };

  const stopGame = () => {
    if (gameStarted) {
      setGameStarted(false);
      clearInterval(fruitSpawnInterval);
      setFruits([]);
    }
  };

  return (
    <div className={styles.gameContainer}>
      <div className={styles.scoreDisplay}>Score: {score}</div>
      {!gameStarted && (
        <button onClick={startGame} className={styles.startButton}>
          Start
        </button>
      )}

      {gameStarted && (
        <button onClick={stopGame} className={styles.stopButton}>
          Exit
        </button>
      )}

      <div className={styles.gameInnerContainer}>
        {fruits.map((fruit) => (
          <Fruit
              fruit={{
              x: fruit.x,
              y: fruit.y,
              icon: fruit.type.icon,
              name: fruit.type.name,
              color: fruit.type.color,
            }}
            onClick={() => handleFruitClick(fruit.id, fruit.type.points)}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
