import { useEffect, useState } from 'react'
import '../App.css'
import SingleCard from '../components/SingleCard'
import { useTimer } from 'react-timer-hook';

const Home = () => {
  const cardImages = [
    { src: "/img/success-kid.png", matched: false },
    { src: "/img/potion-1.png", matched: false },
    { src: "/img/ring-1.png", matched: false },
    { src: "/img/scroll-1.png", matched: false },
    { src: "/img/twitter.png", matched: false },
    { src: "/img/sword-1.png", matched: false },
  ];
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    restart(getDate());
  };

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore((prevScore) => prevScore + 10);
        console.log("match");
      } else {
        console.log("not match");
      }

      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (score / 10 === cardImages.length) {
      alert("Congratulation your score is " + score);
      pause();
    }
  }, [score]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // custom hook timer
  const getDate = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 90);
    return time;
  };

  const timesUp = () => {
    setTimeout(() => {
      setDisabled(true);
      alert("time's up");
    }, 1000);
  };

  const { seconds, minutes, pause, restart } = useTimer({
    expiryTimestamp: getDate(),
    onExpire: () => timesUp(),
  });

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div style={{ width: "100%", textAlign: "left" }}>
        <h3>Score: {score}</h3>
        <h3>Turn: {turns}</h3>
      </div>
      <div style={{ fontSize: "50px" }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
