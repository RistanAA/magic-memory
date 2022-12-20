import { useEffect, useRef, useState } from "react";
import "../App.css";
import SingleCard from "../components/SingleCard";
import { useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";
import { addProgress } from "../redux/modules/gameProgress";
// import Timer from "../components/Timer";

const Home = () => {
  const gameProgress = useSelector((state) => state.gameProgress.cardImages);
  const timeLeft = useSelector((state) => state.gameProgress.timeLeft);
  const dispatch = useDispatch();
  
  const cardImages = [
    { src: "/img/success-kid.png", srcId: "1", matched: false },
    { src: "/img/potion-1.png", srcId: "2", matched: false },
    { src: "/img/ring-1.png", srcId: "3", matched: false },
    { src: "/img/scroll-1.png", srcId: "4", matched: false },
    { src: "/img/twitter.png", srcId: "5", matched: false },
    { src: "/img/sword-1.png", srcId: "6", matched: false },
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

    gameProgress.length ? setCards(gameProgress) : setCards(shuffledCards);
    // console.log(gameProgress, shuffledCards);
    // setCards(shuffledCards)
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

  // const addGameProgress = () => {
  //   dispatch(addProgress(cards));
  // };

  useEffect(() => {
    dispatch(addProgress({cards,minutes,seconds}));
  }, [dispatch, cards]);


// usememo



  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.srcId === choiceTwo.srcId) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.srcId === choiceOne.srcId) {
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
      let finalScore = score - 2 - (turns * 2)
      alert("Congratulation your score final score is " + finalScore);
      pause();
    }
  }, [score]);
  // console.log(gameProgress);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  // const timerRef = useRef()

  // custom hook timer
  const getDate = () => {
    const time = new Date();
    let addTime = timeLeft ? timeLeft : 90
    time.setSeconds(time.getSeconds() + addTime);
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
// console.log(minutes)
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
      {/* <Timer ref={timerRef} timeLeft={timeLeft} setDisabled={setDisabled}/> */}

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
