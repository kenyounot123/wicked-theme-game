interface AnswerRevealProps {
  gameData: TriviaData[],
}
interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
}

export default function AnswerReveal({gameData}:AnswerRevealProps) {
  return (
    <div className="space-y-6 p-4 bg-accent rounded-lg shadow-lg mt-5">
      <h1 className="text-2xl font-bold text-primary mb-4">Answer Reveal</h1>
      {gameData.map((trivia, index) => (
        <div key={index} className="bg-accent/20 p-4 rounded-lg space-y-2">
          <h2 className="text-lg font-medium text-primary">{trivia.question}</h2>
          <p className="text-primary font-semibold">
            Answer: <span className="text-primary">{trivia.answer}</span>
          </p>
        </div>
      ))}
    </div>
  )
}