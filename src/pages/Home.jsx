import { useEffect, useMemo, useRef, useState } from "react";
import "../App.css";
import SingleCard from "../components/SingleCard";
import { useTimer } from "react-timer-hook";
import { useDispatch, useSelector } from "react-redux";
import { addProgress, sendScore } from "../redux/modules/gameProgress";
import ListCard from "../components/ListCard";
import { getCards } from "../redux/modules/cardSlice";
import { useNavigate } from "react-router-dom";
// import Timer from "../components/Timer";

const Home = () => {
  const gameProgress = useSelector((state) => state.gameProgress.cardImages);
  const timeLeft = useSelector((state) => state.gameProgress.timeLeft);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cardImages = useSelector((state) => state.cardSlice.cards);
  // const cardImages = [
  //   { src: "/img/success-kid.png", srcId: "1", matched: false },
  //   { src: "/img/potion-1.png", srcId: "2", matched: false },
  //   { src: "/img/ring-1.png", srcId: "3", matched: false },
  //   { src: "/img/scroll-1.png", srcId: "4", matched: false },
  //   { src: "/img/twitter.png", srcId: "5", matched: false },
  //   { src: "/img/sword-1.png", srcId: "6", matched: false },
  // ];
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

  const cardList = useMemo(() => cards, [cards]);

  useEffect(() => {
    setCards(cardList);
    dispatch(addProgress({ cards, minutes, seconds }));
    // console.log(cards);
  }, [dispatch, cards]);

  // usememo

  // const cardList = useMemo(() => cards,[cards])
  // console.log(cardList)

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne._id === choiceTwo._id) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card._id === choiceOne._id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore((prevScore) => prevScore + 10);
        // console.log("match");
      } else {
        // console.log("not match");
      }

      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cardImages.length < 1) {
      dispatch(getCards());
      shuffleCards();
    }
    pause();
  }, [dispatch, cardImages]);

  useEffect(() => {
    if (cardImages.length > 0) {
      if (score / 10 === cardImages.length) {
        let finalScore = score - 2 - turns * 2;
        dispatch(
          sendScore({
            userId: "63a1a6952cabe62b5cabb3f1tes",
            username: "user2",
            score: finalScore,
          })
        );
        pause();
        alert("Congratulation your score final score is " + finalScore);
        navigate("/leaderboard");
      }
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
    let addTime = timeLeft ? timeLeft : 90;
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
      {/* <h1>Memory Game</h1> */}
      <div
        style={{
          margin: "auto",
          width: "50%",
          padding: "10px",
        }}
      >
        <button onClick={shuffleCards}>New Game</button>
        <div style={{ width: "100%", textAlign: "left" }}>
          <h3 style={{ color: "white" }}>Score: {score}</h3>
          <h3 style={{ color: "white" }}>Turn: {turns}</h3>
        </div>
        <div style={{ color: "white", fontSize: "50px" }}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
      {/* <Timer ref={timerRef} timeLeft={timeLeft} setDisabled={setDisabled}/> */}

      {/* componen baru */}
      <ListCard
        cards={cardList}
        handleChoice={handleChoice}
        choiceOne={choiceOne}
        choiceTwo={choiceTwo}
        disabled={disabled}
      />
      {/* <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div> */}
    </div>
  );
};

export default Home;
