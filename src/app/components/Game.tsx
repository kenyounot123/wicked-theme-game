"use client"
import { useEffect, useState } from "react"
import VictoryScreen from "./VictoryScreen"
import DefeatScreen from "./DefeatScreen"
import AnswerReveal from "./AnswerReveal"

interface GameProps {
  gameData: TriviaData[],
  timeLimit: number
}
interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
  topic: string
}
export default function Game({gameData, timeLimit}: GameProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit) 
  const [score, setScore] = useState<number>(0)
  const [winConditionSatisfied, setWinConditionSatisfied] = useState<boolean | null>(null)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswer, setUserAnswer] = useState<string>("")

  useEffect(() => {
    setTimeLeft(30); // Reset to initial timer value when question changes
  }, [questionNumber]);


  useEffect(() => {
    if (winConditionSatisfied) {
      return; 
    }
    if (timeLeft <= 0) {
      updateWin(false); 
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); 
  }, [timeLeft, winConditionSatisfied, questionNumber]);

  const handleSubmitAnswer = () => {
    if (!userAnswer) return
    setUserAnswer("")

    const correct = checkIfCorrectAnswer(userAnswer, gameData[questionNumber].answer)
    if (correct) {
      updateScore()
      if (nextQuestionExists()) {
        proceedToNextQuestion()
      } else {
        updateWin(true) // When a win has occured we need someway to stop the timer , exit out of the useEffect
      }
    } else {
      alert("Incorrect answer. Try again!");
    }
  }

  const nextQuestionExists = () => {
    return questionNumber + 1 < gameData.length
  }

  const updateScore = () => {
    setScore(prevScore => prevScore + 1)
  }

  const proceedToNextQuestion = () => {
    setQuestionNumber(prevQuestion => prevQuestion + 1)
  }

  const updateWin = (result:boolean) => {
    setWinConditionSatisfied(result)
  }

  const checkIfCorrectAnswer = (userAnswer:string, actualAnswer:TriviaData["answer"]) => {
    return normalizeAnswer(userAnswer) === normalizeAnswer(actualAnswer)
  }

  const normalizeAnswer = (answer:string) => {
    const normalizedAnswer = answer.toLowerCase().trim()
    return normalizedAnswer
  }
  return (
    <section>
      {winConditionSatisfied === null && (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Score: {score}</span>
              <span className="text-xl font-semibold flex items-center">
                Time Left: {timeLeft}
              </span>
            </div>
            <div className="min-w-96 bg-purple-700 p-4 rounded-lg">
              {gameData.map((triviaQuestion, index) => (
                <h2 key={index} className={`text-lg font-medium mb-2 ${questionNumber === index ? '' : 'hidden'}`}>{triviaQuestion.question}</h2>
              ))}
              <input
                type="text"
                value={userAnswer}
                placeholder="Enter your answer"
                className="w-full px-3 py-2 bg-purple-600 text-purple-100 placeholder-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitAnswer();
                  }
                }}
                />
            </div>
            <button onClick={handleSubmitAnswer} className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg transition duration-200">
              Submit Answer
            </button>
          </div>
        </>
      )}
      {winConditionSatisfied === true && <VictoryScreen score={score} totalQuestions={gameData.length}/>}
      {winConditionSatisfied === false && <DefeatScreen score={score} totalQuestions={gameData.length}/>}
      {winConditionSatisfied !== null && <AnswerReveal gameData={gameData}/>}
    </section> 
  )
}