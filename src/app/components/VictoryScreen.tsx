export default function VictoryScreen({ score, totalQuestions }: { score: number; totalQuestions: number }) {
  return (
    <div className="space-y-6">
      <div className="min-w-96 bg-accent/20 p-6 rounded-lg text-center shadow-lg mt-10 bg-accent">
        <h2 className="text-3xl font-bold mb-4 text-primary">Congratulations!</h2>
        <p className="text-xl mb-6">You&apos;ve completed all the trivia questions!</p>
        <div className="bg-accent p-4 rounded-lg inline-block bg-light">
          <p className="text-2xl font-semibold">
            Final Score: <span className="text-primary">{score}</span> / {totalQuestions}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 px-4 bg-btn text-primary font-semibold rounded-lg transition-colors duration-200 text-lg"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}