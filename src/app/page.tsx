// import { SkullIcon, HourglassIcon } from '@heroicons/react/24/solid'

export default function WickedTrivia() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-900 p-4">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-purple-800 text-purple-100">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-400 flex items-center justify-center">
          {/* <SkullIcon className="w-8 h-8 mr-2" /> */}
          Wicked Trivia
        </h1>

        {/* Game setup section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <label htmlFor="timer" className="text-sm font-medium">
              Timer Duration: 30 seconds
            </label>
            <input
              type="range"
              id="timer"
              min="10"
              max="60"
              step="5"
              defaultValue="30"
              className="w-[60%] accent-green-500"
            />
          </div>
          <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg transition duration-200">
            Start Game
          </button>
        </div>

        {/* Game play section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">Score: 0</span>
            <span className="text-xl font-semibold flex items-center">
              {/* <HourglassIcon className="w-6 h-6 mr-2 animate-pulse" /> */}
              30s
            </span>
          </div>
          <div className="bg-purple-700 p-4 rounded-lg">
            <h2 className="text-lg font-medium mb-2">What is the capital of France?</h2>
            <input
              type="text"
              placeholder="Enter your answer"
              className="w-full px-3 py-2 bg-purple-600 text-purple-100 placeholder-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg transition duration-200">
            Submit Answer
          </button>
        </div>

        {/* Toast notification */}
        <div className="fixed top-4 right-4 bg-purple-700 text-purple-100 p-4 rounded-lg shadow-lg">
          <h3 className="font-bold">Correct!</h3>
          <p>You&apos;ve earned a point!</p>
        </div>
      </div>
    </div>
  )
}