interface EditQAFormProps {
  gameData: TriviaData[],
  setGameData: React.Dispatch<React.SetStateAction<TriviaData[]>>
  setLoadGame: React.Dispatch<React.SetStateAction<boolean>>
}
interface TriviaData {
  difficulty: "easy" | "medium" | "hard",
  question: string
  answer: string
  topic: string
}

export default function EditQAForm({gameData, setGameData, setLoadGame}:EditQAFormProps) {
  const handleInputChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newData = [...gameData]
    newData[index][field] = value
    setGameData(newData)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-accent rounded-xl shadow-2xl mt-8">
      <h1 className="text-3xl font-extrabold text-primary mb-6 text-center">Confirm Answers and Questions</h1>
      {gameData.map((trivia, index) => (
        <form key={index} className="bg-accent p-6 rounded-lg shadow-inner mb-6 last:mb-0">
          <div className="space-y-4">
            <div>
              <label htmlFor={`edit-question-${index}`} className="block text-lg font-semibold text-primary mb-2">
                Question:
              </label>
              <input
                id={`edit-question-${index}`}
                type="text"
                value={trivia.question}
                onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                className="w-full px-4 py-2 bg-accent/20 text-primary rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
              />
            </div>
            <div>
              <label htmlFor={`edit-answer-${index}`} className="block text-lg font-semibold text-btn mb-2">
                Answer:
              </label>
              <input
                id={`edit-answer-${index}`}
                type="text"
                value={trivia.answer}
                onChange={(e) => handleInputChange(index, 'answer', e.target.value)}
                className="w-full px-4 py-2 bg-accent/20 text-btn rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
              />
            </div>
          </div>
        </form>
      ))}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setLoadGame(true)}
          className="px-6 py-3 bg-btn hover:bg-green-600 text-primary font-semibold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Confirm Changes
        </button>
      </div>
    </div>
  )
}