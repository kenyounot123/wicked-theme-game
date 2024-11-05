export default function VictoryScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-800 text-white text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Congratulations!</h1>
      <p className="text-xl mb-6">You’ve completed all the trivia questions!</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-purple-900 font-semibold rounded-lg transition duration-200"
      >
        Play Again
      </button>
    </div>
  );
}