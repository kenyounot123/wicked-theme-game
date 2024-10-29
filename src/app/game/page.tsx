export default function Game() {
  return (
    <section>
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
    </section> 
  )
}