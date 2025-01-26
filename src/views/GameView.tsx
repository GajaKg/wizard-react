import { useEffect, useState, type FC } from "react";
import { Link } from "react-router";

import { Card } from 'primereact/card';
import CardBox from '../components/CardBox'
import JokeShow from "../components/JokeShow";

import { game } from "../utils/Engine";
// @ts-expect-error ---
import { Card as CardPoker, Hand as HandPoker } from "./Pokersolver"
import { useTimer } from "../hooks/timer";
import { iJoke, jokeService } from "../services/Joke.service";
import { useAppDispatch } from "../store/hooks";
import { addScore } from "../store/gameSlice";

const GameView: FC = () => {

  const dispatch = useAppDispatch();

  const timer = useTimer(15);
  const { handSolved, getAnswers } = game.handAndAnswers();
  const [hand, setHand] = useState<HandPoker>(handSolved)
  const [answers, setAnswers] = useState<string[]>(getAnswers)
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false);
  const [joke, setJoke] = useState<iJoke | null>();
  const [score, setScore] = useState<number>(0);
  const suddenDeath: number = 10;

  const loadJoke = async () => {
    const newJoke = await jokeService.getJoke();
    setJoke(newJoke)
  };

  useEffect(() => {
    if (timer.timesUp) {
      setJoke(null);
      dispatch(addScore(score))
    }
  }, [timer.timesUp, dispatch, score, joke])

  const onAnswerSelected = (answer: string): void => {
    if (timer.timesUp) return;

    let correctAnswer = false;
    setIsDirty(true);

    if (hand.name === answer) {
      setIsCorrectAnswer(true);
      correctAnswer = true;
      setScore((score) => score + 1)
    } else {
      setIsCorrectAnswer(false);
    }

    timer.updateTime(correctAnswer);

    const { handSolved, getAnswers } = game.handAndAnswers();
    setHand(handSolved);
    setAnswers(getAnswers);

    loadJoke()
  }

  const AnswerList = answers.map((answer: string, i: number) => {
    return (
      <div onClick={() => onAnswerSelected(answer)}
        key={i}
        className="border rounded-xl p-2 text-center cursor-pointer">
        {answer}
      </div>
    )
  });

  return (
    <Card className="flex items-center justify-center flex-col m-auto w-full max-w-sm md:max-w-xl rounded shadow-xl p-4 overflow-auto" style={{ height: "80vh" }} >
      {/****** Timer ******/}
      <div
        className={`${timer.counter < suddenDeath ? 'text-red-500 dark:text-red-500' : ''} mb-10 order-1 text-5xl font-extrabold leading-none text-blue-500 dark:text-blue-500 text-right`}
      >
        {timer.counter}
      </div>

      {/****** Hand ******/}
      <div className="flex flex-wrap gap-3 justify-center">
        {hand && hand.cards.map((card: CardPoker, i: number) => (
          <CardBox cardType={card.suit} key={i}>{card.value}</CardBox>
        ))}
      </div >

      {/******  Info ******/}
      <div className={`${isCorrectAnswer && !timer.timesUp ? "text-green-500" : "text-red-500"} h-6 mt-4 font-bold text-center`}>
        {isDirty && !timer.timesUp && (<span>{
          isCorrectAnswer
            ? `Correct!! You gain ${timer.step} seconds`
            : `Wrong! You loose ${timer.step} seconds`
        }</span>)}
        {timer.timesUp && (<span>Game over :(</span>)}
      </div>

      {/****** Links ******/}
      {timer.timesUp && <div className="mt-6 text-center">
        <div>
          <Link to="/leaderboard" className="text-blue-400">
            Go to Leaderboard
          </Link>
          </div>
          <div>
          <Link to="/" className="inline-block mt-2 text-blue-400">
            Start New Game
          </Link>
          </div>
      </div>}

      {/****** Answers ******/}
      <div className={`${timer.timesUp ? 'game-over' : ''} mt-10 answers-list`}>
        {AnswerList}
      </div>

      {/****** Joke ******/}
      <div className=" h-10">
        {joke && <JokeShow setup={joke?.setup} punchline={joke?.punchline} />}
        <div className="mt-6 h-10 text-center">{!joke && isDirty && !timer.timesUp && '...loading'}</div>
      </div>
    </Card >
  );
};

export default GameView;