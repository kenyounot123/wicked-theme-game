// Completely client sided game with api route for question generation
// focus on making cool UI feedback mechanisms and overall engagement
"use client";
import { useState } from "react";
import Game from "./components/Game";

interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
}
export default function WickedTrivia() {
  const [timeSliderVal, setTimeSliderVal] = useState<string>("30");
  const [difficulty, setDifficulty] = useState<string>("medium");
  const [loadGame, setLoadGame] = useState<boolean>(false)
  const [gameData, setGameData] = useState<TriviaData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const gameStart = loadGame && gameData.length > 0

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    const time = formData.get('timer')
    const difficulty = formData.get('difficulty')

    const gameSettings = { time, difficulty }
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

      console.log(questionsAndAnswers)
      setLoadGame(true)
      setGameData(questionsAndAnswers)

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }

  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-purple-900 p-4">
        {!gameStart ? (
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-purple-800 text-purple-100">
            <h1 className="text-4xl font-bold mb-6 text-center text-green-400 flex items-center justify-center">
              {/* <SkullIcon className="w-8 h-8 mr-2" /> */}
              Wicked Trivia
            </h1>

            {/* Game setup section */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="space-y-2">
                <label htmlFor="timer" className="font-bold text-sm">
                  Timer Duration: <span className="text-2xl">{timeSliderVal}</span>{" "}
                  seconds
                </label>
                <input
                  type="range"
                  id="timer"
                  min="10"
                  max="60"
                  step="5"
                  value={timeSliderVal}
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
                  name="difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full px-3 py-2 text-purple-900 bg-purple-200 border border-purple-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg transition duration-200">
                {loading ? "Loading game..." : "Start Game"}
              </button>
            </form>
          </div>
        ) : (
          <Game gameData={gameData} timeLimit={parseInt(timeSliderVal)}/>
        )}
      </div>
    </>
  );
}
