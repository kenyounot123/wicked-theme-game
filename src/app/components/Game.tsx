"use client";
import { useEffect, useState } from "react";
import VictoryScreen from "./VictoryScreen";
import DefeatScreen from "./DefeatScreen";
import AnswerReveal from "./AnswerReveal";

interface GameProps {
  gameData: TriviaData[];
  timeLimit: number;
}
interface TriviaData {
  difficulty: "easy" | "medium" | "hard";
  question: string;
  answer: string;
  topic: string;
}
export default function Game({ gameData, timeLimit }: GameProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [score, setScore] = useState<number>(0);
  const [winConditionSatisfied, setWinConditionSatisfied] = useState<
    boolean | null
  >(null);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setTimeLeft(timeLimit); // Reset to initial timer value when question changes
  }, [questionNumber]);

  useEffect(() => {
    if (winConditionSatisfied || paused) {
      return;
    }
    if (timeLeft <= 0) {
      if (nextQuestionExists()) {
        proceedToNextQuestion();
      } else {
        updateWin(false);
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, winConditionSatisfied, paused]);

  const handleSubmitAnswer = () => {
    if (!userAnswer) return;
    setUserAnswer("");

    const correct = checkIfCorrectAnswer(
      userAnswer,
      gameData[questionNumber].answer
    );
    if (correct) {
      updateScore();
      if (nextQuestionExists()) {
        proceedToNextQuestion();
      } else {
        updateWin(true); // When a win has occured we need someway to stop the timer , exit out of the useEffect
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
  };

  const nextQuestionExists = () => {
    return questionNumber + 1 < gameData.length;
  };

  const updateScore = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const proceedToNextQuestion = () => {
    setQuestionNumber((prevQuestion) => prevQuestion + 1);
  };

  const updateWin = (result: boolean) => {
    setWinConditionSatisfied(result);
  };

  const checkIfCorrectAnswer = (
    userAnswer: string,
    actualAnswer: TriviaData["answer"]
  ) => {
    return normalizeAnswer(userAnswer) === normalizeAnswer(actualAnswer);
  };

  const normalizeAnswer = (answer: string) => {
    const normalizedAnswer = answer.toLowerCase().trim();
    return normalizedAnswer;
  };

  const handlePauseToggle = () => {
    setPaused((prev) => !prev);
  };

  const handleSkipQuestion = () => {
    if (nextQuestionExists()) {
      proceedToNextQuestion();
    } else {
      updateWin(false);
    }
  };

  return (
    <section className="p-4">
      {winConditionSatisfied === null && (
        <div className="space-y-8">
          <div className="text-center">
            <button
              onClick={handlePauseToggle}
              className="shadow-lg inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-secondary text-primary font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
            >
              <span className="mr-2">{paused ? "Play" : "Pause"}</span>
              <span className="text-2xl">{paused ? "▶" : "❚❚"}</span>
            </button>
          </div>

          <div className="bg-accent rounded-xl shadow-lg overflow-hidden">
            <div className="flex justify-between items-center bg-accent/20 px-6 py-4">
              <div className="text-xl font-semibold">
                Score: <span className="text-3xl font-bold text-primary">{score}</span>
              </div>
              <div className="text-xl font-semibold flex items-center">
                Time Left: <span className="ml-2 text-3xl font-bold text-primary">{timeLeft}</span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-bold text-center">
                {gameData[questionNumber].question}
              </h2>
              <input
                type="text"
                value={userAnswer}
                placeholder="Enter your answer"
                className="w-full px-4 py-3 bg-light text-primary placeholder-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-btn transition duration-300 ease-in-out"
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitAnswer()
                  }
                }}
              />
              <button
                onClick={handleSubmitAnswer}
                className="w-full py-3 px-6 bg-btn hover:bg-btn text-primary font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-btn focus:ring-opacity-50"
              >
                Submit Answer
              </button>
              <button
                onClick={handleSkipQuestion}
                className="w-full mt-2 py-3 px-6 bg-secondary hover:bg-secondary text-primary font-bold rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Skip Question
              </button>
            </div>
          </div>
        </div>
      )}
      {winConditionSatisfied === true && (
        <VictoryScreen score={score} totalQuestions={gameData.length} />
      )}
      {winConditionSatisfied === false && (
        <DefeatScreen score={score} totalQuestions={gameData.length} />
      )}
      {winConditionSatisfied !== null && <AnswerReveal gameData={gameData} />}
    </section>
  );
}
