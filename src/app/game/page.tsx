import { useEffect, useState } from "react"
import CountdownTimer from "../components/CountdownTimer"
import VictoryScreen from "../components/VictoryScreen"
import DefeatScreen from "../components/DefeatScreen"


interface GameProps {
  gameData: TriviaData[],
  timeLimit: number
}
interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
}

export default function Game({gameData, timeLimit}: GameProps) {
  const [score, setScore] = useState<number>(0)
  const [winConditionSatisfied, setWinConditionSatisfied] = useState<boolean | null>(null)
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswer, setUserAnswer] = useState<string>("")

  useEffect(() => {
    checkWinCondition()
  }, [score, timeLimit])
  
  const handleSubmitAnswer = () => {
    if (!userAnswer) return

    const correct = checkIfCorrectAnswer(userAnswer, gameData[questionNumber].answer)
    if (correct) {
      updateScore()
      proceedToNextQuestion()
    } else {
      alert("Incorrect answer. Try again!");
    }
  }

  const updateScore = () => {
    setScore(prevScore => prevScore + 1)
  }

  const proceedToNextQuestion = () => {
    setQuestionNumber(prevQuestion => prevQuestion + 1)
  }

  const checkWinCondition = () => {
    if (score < gameData.length && timeLimit === 0) {
      setWinConditionSatisfied(false)
    } else {
      setWinConditionSatisfied(true)
    }
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
      {questionNumber < gameData.length && (
        <>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">Score: {score}</span>
              <span className="text-xl font-semibold flex items-center">
                {/* <HourglassIcon className="w-6 h-6 mr-2 animate-pulse" /> */}
                <CountdownTimer timeInSeconds={timeLimit}/>
              </span>
            </div>
            <div className="bg-purple-700 p-4 rounded-lg">
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
      {winConditionSatisfied && <VictoryScreen/>}
      
      {winConditionSatisfied !== null && winConditionSatisfied === false && <VictoryScreen/>}
    </section> 
  )
}