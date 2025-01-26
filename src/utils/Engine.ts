import { cards, cardHands } from "../mock/data.js";
// @ts-expect-error asd
import { Hand } from "./Pokersolver"

class Game {
    private numberOfCards: number = 5;
    private numberOfAnswers: number = 3;
    private cards: string[] = cards;
    private cardsLength: number = cards.length;
    private cardHands: string[] = cardHands;
    private cardHandsLength: number = cardHands.length;

    constructor(numberOfCards?: number, numberOfAnswers?: number) {
        this.numberOfCards = numberOfCards ?? this.numberOfCards;
        this.numberOfAnswers = numberOfAnswers ?? this.numberOfAnswers;
    }

    // get random hand
    private getHand(): string[] {
        const hand: string[] = [];

        let counter = 1;
        while (counter <= this.numberOfCards) {
            const random = this.randomNumber(this.cardsLength, 0);
            if (!hand.includes(this.cards[random])) {
                hand.push(this.cards[random])
                counter++
            }
        }

        return hand;
    }

    private getAnswers(correctAnswer: string) {
        // number of answers options without correct answer  
        const size = this.numberOfAnswers - 1;
        const randomIndexAnswerCorrect = this.randomNumber(0, size);

        // add correct answer
        const answers: string[] = [];
        answers[randomIndexAnswerCorrect] = correctAnswer;

        // get random answers
        let counter = 1;
        while (counter <= size) {
            const randomHandIndex = this.randomNumber(0, this.cardHandsLength - 1);
            const randomIndexAnswer = this.randomNumber(0, size);

            // Check if is already exist answer in options and check position in array
            if (!answers.includes(this.cardHands[randomHandIndex]) && !answers[randomIndexAnswer]) {
                answers[randomIndexAnswer] = this.cardHands[randomHandIndex];
                counter++
            }
        }

        return answers;

    }

    handAndAnswers() {
        const getHand = game.getHand();
        const handSolved = Hand.solve(getHand);
        const getAnswers = game.getAnswers(handSolved.name);

        return {
            handSolved,
            getAnswers,
        };
    }

    randomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export const game = new Game();