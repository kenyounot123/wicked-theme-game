// This will handle the endpoint for openai api
// Generate questions dynamically
import OpenAI from "openai"
import { NextRequest, NextResponse } from "next/server";

const systemPrompt = `
  You are a trivia question generator for a game. Based on the specified difficulty level and topic, generate trivia questions in a JSON format where users will provide the answer in text form. Each question should include a difficulty level (easy, medium, or hard), the question text, and the correct answer. The JSON structure should follow this format:
{ 
  trivia: {
    "difficulty": "<difficulty level>",
    "question": "<question text>",
    "topic": "<topic>",
    "answer": "<correct answer>"
  }
}

Guidelines:
1. Select questions appropriate to the specified difficulty level:
   - Easy: Basic or widely known facts.
   - Medium: Intermediate questions that may require more thought or knowledge.
   - Hard: Challenging questions that require in-depth knowledge or specialized understanding.

2. Ensure each question is phrased clearly and can be answered in a single word or a short phrase.

Example JSON for an "easy" difficulty question:
{ 
  trivia: {
    "difficulty": "easy",
    "question": "What is the capital of France?",
    "topic": "Geography"
    "answer": "Paris"
  }
}

Respond only with JSON for each question.
`

export async function POST(req:NextRequest){
  const { difficulty, topic, questionAmount } = await req.json()

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const triviaQuestionsAndAnswers = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: systemPrompt
      },
      {
        role: "user",
        content: `Generate me ${questionAmount} random trivia questions, all of difficulty level: ${difficulty}, and topic related to ${topic} Please ensure that every question has the same difficulty level and is related to the topic given. Format the output as an array of JSON objects.`
      }
    ],
    response_format: { type: "json_object" },
  })
  const content = triviaQuestionsAndAnswers.choices[0]?.message?.content
  if (content) {
    const questionsAndAnswers = JSON.parse(content) 
    return NextResponse.json(questionsAndAnswers.trivia)
  } else {
    return NextResponse.json(
      { error: "Failed to retrieve trivia questions." },
      { status: 500 }
    );
  }
}