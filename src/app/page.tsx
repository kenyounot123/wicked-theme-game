"use client";
import { useState } from "react";
import Game from "./components/Game";
import EditQAForm from "./components/EditQA";

interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
  topic: string
}


// const triviaData: TriviaData[] = [
//   {
//     difficulty: "easy",
//     question: "What is the capital of France?",
//     answer: "Paris",
//     topic: "Geography"
//   },
//   {
//     difficulty: "medium",
//     question: "Who painted the Mona Lisa?",
//     answer: "Leonardo da Vinci",
//     topic: "Art"
//   },
//   {
//     difficulty: "hard",
//     question: "What is the chemical symbol for the element with atomic number 76?",
//     answer: "Os",
//     topic: "Chemistry"
//   },
//   {
//     difficulty: "easy",
//     question: "What planet is known as the Red Planet?",
//     answer: "Mars",
//     topic: "Astronomy"
//   },
//   {
//     difficulty: "medium",
//     question: "In what year did the Titanic sink?",
//     answer: "1912",
//     topic: "History"
//   }
// ];
export default function WickedTrivia() {
  const [timeSliderVal, setTimeSliderVal] = useState<string>("60");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [topic, setTopic] = useState<string>("")
  const [questionAmount, setQuestionAmount] = useState<string>("")
  const [loadGame, setLoadGame] = useState<boolean>(false)
  const [gameData, setGameData] = useState<TriviaData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const gameStart = loadGame && gameData.length > 0

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const time = formData.get('timer')
    const difficulty = formData.get('difficulty')
    const topic = formData.get('topic')
    const questionAmount = formData.get('questionAmount')

    if (!time || !difficulty || !topic || !questionAmount) {
      alert('All fields are required!');
      return;
    }
    setLoading(true)

    const gameSettings = { time, difficulty, topic, questionAmount }
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(gameSettings)
      })

      if (!response.ok) {
        throw new Error("Sorry could not generate the appropriate questions and answers")
      }

      const questionsAndAnswers = await response.json()

      setGameData(questionsAndAnswers)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <div className="min-w-96 min-h-screen flex items-center justify-center bg-purple-900 p-4">
        {gameData.length === 0 && (
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-purple-800 text-purple-100">
            <h1 className="text-4xl font-bold mb-6 text-center text-green-400 flex items-center justify-center">
              {/* <SkullIcon className="w-8 h-8 mr-2" /> */}
              Wicked Trivia
            </h1>

            {/* Game setup section */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="timer" className="font-bold text-sm">
                  Timer Duration: <span className="text-2xl">{timeSliderVal}</span>{" "}
                  seconds
                </label>
                <input
                  type="range"
                  id="timer"
                  min="10"
                  max="120"
                  step="5"
                  value={timeSliderVal}
                  disabled={loading}
                  name="timer"
                  onChange={(e) => setTimeSliderVal(e.target.value)}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:bg-green-500
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:bg-green-400
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:bg-green-500
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:hover:bg-green-400"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="difficulty-select" className="font-bold text-sm">
                  Choose your difficulty
                </label>
                <select
                  id="difficulty-select"
                  value={difficulty}
                  disabled={loading}
                  name="difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-purple-900 bg-purple-200 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="topic" className="font-bold text-sm">
                  Type in a topic
                </label>
                <input
                  id="topic"
                  value={topic}
                  disabled={loading}
                  name="topic"
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 text-purple-900 bg-purple-200 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="question-amount" className="font-bold text-sm">
                  Number of questions
                </label>
                <input
                  type="number"
                  id="question-amount"
                  min={1}
                  max={10}
                  value={questionAmount}
                  disabled={loading}
                  name="questionAmount"
                  onChange={(e) => setQuestionAmount(e.target.value)}
                  className="w-full px-3 py-2 text-purple-900 bg-purple-200 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button disabled={loading} className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                {loading ? "Loading game..." : "Start Game"}
              </button>
            </form>
          </div>
        )}
        {gameData.length > 0 && loadGame === false && <EditQAForm gameData={gameData} setGameData={setGameData} setLoadGame={setLoadGame}/>}
        {gameStart && <Game gameData={gameData} timeLimit={parseInt(timeSliderVal)}/>}
      </div>
    </>
  );
}