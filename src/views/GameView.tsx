import { useEffect, useState, type FC } from "react";
import { Card } from 'primereact/card';

import CardBox from '../components/CardBox'
import { game } from "../utils/Engine";

// @ts-expect-error asd
import { Card as CardPoker, Hand as HandPoker } from "./Pokersolver"
import { useTimer } from "../hooks/timer";


const GameView: FC = () => {

  const timer = useTimer(15);
  const { handSolved, getAnswers } = game.handAndAnswers();
  const [hand, setHand] = useState<HandPoker>(handSolved)
  const [answers, setAnswers] = useState<string[]>(getAnswers)
  // const [hand, setHand] = useState<HandPoker>()
  // const [answers, setAnswers] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState<boolean>(false)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean>(false)

  const onAnswerSelected = (answer: string): void => {
    if (timer.timesUp) return;

    setIsDirty(true)

    if (hand.name === answer) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }

    timer.updateTime(isCorrectAnswer);

    const { handSolved, getAnswers } = game.handAndAnswers();
    setHand(handSolved)
    setAnswers(getAnswers)
  }

  // useEffect(() => {
  //   // dont display new cards if times up
  //   if (timer.timesUp) {
  //     return;
  //   }


  // }, [timer.timesUp])

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
      <div
        className="mb-10 order-1 text-5xl font-extrabold leading-none text-blue-300 dark:text-blue-300 text-right"
      >
        {timer.counter}
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {hand && hand.cards.map((card: CardPoker, i: number) => (
          <CardBox cardType={card.suit} key={i}>{card.value}</CardBox>
        ))}
      </div >

      <div className="mt-10 answers-list inline-block" >
        {AnswerList}
      </div>
    </Card >
  );
};

export default GameView;