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

// Uncomment this and set it in the game data state variable
// to test in dev environment without needing openai to constantly generate questions.
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
  const [modal, setModal] = useState<boolean>(false)

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
      <div className="min-w-96 min-h-screen flex items-center justify-center bg-background p-4">
        {gameData.length === 0 && (
          <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-accent">
            <div className="relative">
              <h1 className="text-4xl font-bold mb-6 text-center flex items-center justify-center text-title">
                {/* <SkullIcon className="w-8 h-8 mr-2" /> */}
                Wicked Trivia
              </h1>

              <button
                onClick={() => setModal(!modal)}
                className="absolute top-0 right-0 px-4 py-2 bg-btn text-primary font-semibold rounded-lg shadow-md hover:bg-btn/80 transition duration-200"
              >
                Help
              </button>
            </div>

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
                  [&::-webkit-slider-thumb]:bg-btn
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-webkit-slider-thumb]:transition-all
                  [&::-webkit-slider-thumb]:hover:bg-btn
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:bg-btn
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:transition-all
                  [&::-moz-range-thumb]:hover:bg-btn"
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
                  className="w-full px-3 py-2 bg-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
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
                  className="w-full px-3 py-2 bg-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
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
                  className="w-full px-3 py-2 bg-light rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
              <button disabled={loading} className="w-full px-6 py-3 bg-btn font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-btn focus:ring-opacity-50">
                {loading ? "Loading game..." : "Start Game"}
              </button>
            </form>
          </div>
        )}
        {gameData.length > 0 && loadGame === false && <EditQAForm gameData={gameData} setGameData={setGameData} setLoadGame={setLoadGame}/>}
        {gameStart && <Game gameData={gameData} timeLimit={parseInt(timeSliderVal)}/>}
      </div>

      {/* Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setModal(false)}
        >
          <div
            className="bg-accent rounded-xl shadow-2xl p-6 max-w-lg w-full transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-primary">Information and Rules</h2>
              <button
                onClick={() => setModal(false)}
                className="text-primary hover:text-btn transition duration-200 text-2xl font-bold"
              >
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-primary">
                Welcome to Wicked Trivia! Test your knowledge with AI-generated trivia questions on any topic you choose.
              </p>
              <div className="text-primary space-y-2">
                <h3 className="font-semibold text-lg">How to Play:</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Set your timer duration (10-120 seconds per question)</li>
                  <li>Choose your difficulty level (Easy, Medium, or Hard)</li>
                  <li>Input a topic of your choice</li>
                  <li>Select the number of questions (1-10)</li>
                  <li>Review and edit the generated questions if needed</li>
                  <li>Answer each question before time runs out!</li>
                </ul>
              </div>
              <p className="text-primary text-sm">
                The game uses AI to generate unique trivia questions based on your chosen topic and difficulty level.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
