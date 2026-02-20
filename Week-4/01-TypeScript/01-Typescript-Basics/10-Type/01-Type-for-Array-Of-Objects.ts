/**
 * Define type of array of objects:
 * - type Type1 = {}
 * - const arrayObj: Type1[] = []
 * 
 * - // number[]
 * - // type Person = {}
 * - const people: Person[]
*/

/**
 * Q. Define a type names QuizQuestion that represents an object with
 *    properties:
 *    - question(string)
 *    - options(array of string)
 *    - correctOption(number)
*/

type QuizQuestion = {
    question: string
    options: string[]
    correctOption: number
}

const quizQuestions: QuizQuestion[] = [
    {
        question: 'What is the capital of France?',
        options: ['Paris', 'Berlin', 'Madrid', 'Rome'],
        correctOption: 0,
    },
    // ... Add more quiz questions
]
