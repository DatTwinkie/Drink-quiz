// Quiz Data
const drinks = [
    { name: "Sprite", abbreviation: "Spr" },
    { name: "Soda", abbreviation: "Sd" },
    { name: "Fanta", abbreviation: "F" },
    { name: "Coke zero", abbreviation: "CZ" },
    { name: "Diet Coke", abbreviation: "DC" },
    { name: "Makecolli", abbreviation: "Mak" },
    { name: "Soju", abbreviation: "Sj" },
    { name: "Juice", abbreviation: "J" },
    { name: "Milkis", abbreviation: "Mil" },
    { name: "Mango", abbreviation: "Mg" },
    { name: "Lychee", abbreviation: "Lyc" },
    { name: "Pineapple", abbreviation: "Pine" },
    { name: "Green apple", abbreviation: "Ga" },
    { name: "Apricot", abbreviation: "Apr" },
    { name: "Watermelon", abbreviation: "Wtm" },
    { name: "Banana", abbreviation: "Bnn" },
    { name: "Chocolate", abbreviation: "Choco" },
    { name: "Warm spice", abbreviation: "Ws" },
    { name: "Pumpkin spice", abbreviation: "Ps" },
    { name: "Coconut", abbreviation: "Ccn" },
    { name: "Strawberry", abbreviation: "Stb" },
    { name: "Green Grape", abbreviation: "Gg" },
    { name: "Pomegranate", abbreviation: "Pome" },
    { name: "Blueberry", abbreviation: "Bb" },
    { name: "Vanilla", abbreviation: "V" },
    { name: "Apple Mango", abbreviation: "Am" },
    { name: "Pink guava", abbreviation: "Pg ice" },
    { name: "Passionfruits", abbreviation: "Pf" },
    { name: "Jasmine", abbreviation: "Jasmine" },
    { name: "Peach", abbreviation: "Peach ice" },
    { name: "Raspberry", abbreviation: "Ras ice" },
    { name: "Blue lemonade", abbreviation: "BL" },
    { name: "Watermelon", abbreviation: "Wtm ice" },
    { name: "Mango", abbreviation: "Mg ice" },
    { name: "Lemonade", abbreviation: "L" }
];

let currentQuestionIndex = 0;
let score = 0;
let shuffledDrinks = [];

// DOM Elements
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const restartButton = document.getElementById('restart-button');

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the quiz
function initializeQuiz() {
    shuffledDrinks = shuffleArray([...drinks]); // Create a shuffled copy of the drinks array
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Load the first question
initializeQuiz();

// Function to load a question
function loadQuestion() {
    const question = shuffledDrinks[currentQuestionIndex];
    questionElement.textContent = `What is the abbreviation for "${question.name}"?`;
    const options = getRandomOptions(question.abbreviation);
    optionsElement.innerHTML = options.map(option => `
        <button class="option-button" onclick="checkAnswer('${option}')">${option}</button>
    `).join('');
    nextButton.classList.add('hidden');
}

// Function to generate random options including the correct answer
function getRandomOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomAbbreviation = drinks[Math.floor(Math.random() * drinks.length)].abbreviation;
        if (!options.includes(randomAbbreviation)) {
            options.push(randomAbbreviation);
        }
    }
    return shuffleArray(options);
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const question = shuffledDrinks[currentQuestionIndex];
    if (selectedOption === question.abbreviation) {
        alert("Correct!");
        score++;
    } else {
        alert(`Incorrect! The correct answer is ${question.abbreviation}.`);
    }
    nextButton.classList.remove('hidden');
}

// Function to load the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledDrinks.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Function to show the final result
function showResult() {
    document.getElementById('quiz-content').classList.add('hidden');
    resultElement.classList.remove('hidden');
    scoreElement.textContent = `${score}/${shuffledDrinks.length}`;
}

// Function to restart the quiz
function restartQuiz() {
    initializeQuiz();
    resultElement.classList.add('hidden');
    document.getElementById('quiz-content').classList.remove('hidden');
}

// Event Listeners
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);