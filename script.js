// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Threat Tabs Functionality with Background Images
const threatTabs = document.querySelectorAll('.threat-tab');
const threatPanels = document.querySelectorAll('.threat-panel');
const threatsSection = document.querySelector('.threats');

// Background image mapping
const threatBackgrounds = {
    'malware': 'malware',
    'phishing': 'phishing',
    'ransomware': 'ransomware',
    'ddos': 'ddos',
    'social': 'social'
};

threatTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and panels
        threatTabs.forEach(t => t.classList.remove('active'));
        threatPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding panel
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Change background image based on selected threat
        changeThreatBackground(tabId);
    });
});

function changeThreatBackground(threatType) {
    // Remove all threat classes
    threatsSection.classList.remove('malware', 'phishing', 'ransomware', 'ddos', 'social');
    
    // Add the class for the current threat
    if (threatBackgrounds[threatType]) {
        threatsSection.classList.add(threatBackgrounds[threatType]);
    }
}

// Set initial background based on active tab
const initialActiveTab = document.querySelector('.threat-tab.active');
if (initialActiveTab) {
    const initialTabId = initialActiveTab.getAttribute('data-tab');
    changeThreatBackground(initialTabId);
}

// Cybersecurity Tips
const cyberTips = [
    "Over 90% of successful cyberattacks start with a phishing email.",
    "Using two-factor authentication can prevent 99.9% of automated attacks.",
    "The average time to identify a breach in 2022 was 207 days.",
    "Strong, unique passwords are your first line of defense against hackers.",
    "Regular software updates patch security vulnerabilities that hackers exploit.",
    "Public Wi-Fi networks are often unsecured - use a VPN when connecting.",
    "Backup your data regularly to protect against ransomware attacks.",
    "Social engineering attacks manipulate human psychology, not technical systems."
];

let currentTipIndex = 0;
const cyberTipElement = document.getElementById('cyberTip');
const newTipButton = document.getElementById('newTip');

function showRandomTip() {
    // Get a random tip that's not the current one
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * cyberTips.length);
    } while (newIndex === currentTipIndex && cyberTips.length > 1);
    
    currentTipIndex = newIndex;
    cyberTipElement.textContent = cyberTips[currentTipIndex];
}

newTipButton.addEventListener('click', showRandomTip);

// Initialize with a random tip
showRandomTip();

// Quiz Functionality
const quizModal = document.getElementById('quizModal');
const startLearningBtn = document.getElementById('startLearning');
const quizMeBtn = document.getElementById('quizMe');
const closeModal = document.querySelector('.close');
const quizContainer = document.getElementById('quizContainer');
const quizResult = document.getElementById('quizResult');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextQuestionBtn = document.getElementById('nextQuestion');
const scoreText = document.getElementById('scoreText');
const restartQuizBtn = document.getElementById('restartQuiz');

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Original questions with correct answers
const originalQuestions = [
    {
        question: "What is the primary goal of cybersecurity?",
        options: [
            "To protect systems, networks, and data from digital attacks",
            "To make computers run faster",
            "To create new software applications",
            "To monitor employee internet usage"
        ],
        correct: 0
    },
    {
        question: "Which of these is NOT a common type of malware?",
        options: [
            "Firewall",
            "Virus",
            "Trojan",
            "Worm"
        ],
        correct: 0
    },
    {
        question: "What does 'phishing' refer to in cybersecurity?",
        options: [
            "A method of catching fish using digital technology",
            "A type of social engineering attack using deceptive emails",
            "A way to speed up internet connections",
            "A technique for organizing computer files"
        ],
        correct: 1
    },
    {
        question: "Why is two-factor authentication important?",
        options: [
            "It makes logging in twice as fast",
            "It adds an extra layer of security beyond just a password",
            "It's required by all websites",
            "It prevents computers from overheating"
        ],
        correct: 1
    },
    {
        question: "What should you do if you receive a suspicious email?",
        options: [
            "Open any attachments to see what they contain",
            "Reply and ask for more information",
            "Delete it without clicking any links or attachments",
            "Forward it to all your contacts to warn them"
        ],
        correct: 2
    }
];

// Emoji questions with correct answers (will be shuffled)
const emojiQuestions = [
    {
        question: "Guess the cybersecurity term: 😮‍💨 + ber + 🐂 + e",
        correctAnswer: "Cyber Bully",
        wrongAnswers: ["Cyber Security", "Cyber Attack", "Cyber Crime"]
    },
    {
        question: "Guess the cybersecurity term: 🔥 + 🧱",
        correctAnswer: "Firewall",
        wrongAnswers: ["Heat Shield", "Brick Security", "Burn Protection"]
    },
    {
        question: "Guess the cybersecurity term: 🚤 + 🥅",
        correctAnswer: "Botnet",
        wrongAnswers: ["Boat Net", "Network Ship", "Fishing Net"]
    },
    {
        question: "Guess the cybersecurity term: 🌑 + 🕸",
        correctAnswer: "Dark Web",
        wrongAnswers: ["Night Spider", "Black Net", "Shadow Network"]
    },
    {
        question: "Guess the cybersecurity term: 123 + tall",
        correctAnswer: "Digital ",
        wrongAnswers: ["Password Steps", "Number Trail", "Code Path"]
    },
    {
        question: "Guess the cybersecurity term: 🐜 + e + virus",
        correctAnswer: "Antivirus",
        wrongAnswers: ["Ant Software", "Bug Protection", "Insect Security"]
    }
];

// Create shuffled emoji questions
const shuffledEmojiQuestions = emojiQuestions.map(question => {
    const allOptions = shuffleArray([question.correctAnswer, ...question.wrongAnswers]);
    const correctIndex = allOptions.indexOf(question.correctAnswer);
    
    return {
        question: question.question,
        options: allOptions,
        correct: correctIndex
    };
});

// Combine all questions
const quizQuestions = [...originalQuestions, ...shuffledEmojiQuestions];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

// Open modal when buttons are clicked
startLearningBtn.addEventListener('click', () => {
    window.location.href = '#fundamentals';
});

quizMeBtn.addEventListener('click', () => {
    startQuiz();
    quizModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    quizModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === quizModal) {
        quizModal.style.display = 'none';
    }
});

function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizContainer.style.display = 'block';
    quizResult.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const question = quizQuestions[currentQuestion];
    questionElement.textContent = question.question;
    
    optionsElement.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option');
        button.textContent = option;
        button.addEventListener('click', () => selectOption(index));
        optionsElement.appendChild(button);
    });
    
    nextQuestionBtn.style.display = 'block';
    selectedOption = null;
}

function selectOption(index) {
    // Remove selected class from all options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    document.querySelectorAll('.option')[index].classList.add('selected');
    selectedOption = index;
}

nextQuestionBtn.addEventListener('click', () => {
    if (selectedOption === null) {
        alert('Please select an answer before continuing.');
        return;
    }
    
    // Check if answer is correct
    if (selectedOption === quizQuestions[currentQuestion].correct) {
        score++;
    }
    
    currentQuestion++;
    
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizContainer.style.display = 'none';
    quizResult.style.display = 'block';
    
    const percentage = Math.round((score / quizQuestions.length) * 100);
    scoreText.textContent = `You scored ${score} out of ${quizQuestions.length} (${percentage}%)`;
    
    if (percentage >= 80) {
        scoreText.textContent += " - Excellent! You have strong cybersecurity knowledge.";
    } else if (percentage >= 60) {
        scoreText.textContent += " - Good job! You have a solid understanding of cybersecurity basics.";
    } else {
        scoreText.textContent += " - Keep learning! Review the material and try again.";
    }
}

restartQuizBtn.addEventListener('click', startQuiz);

// Password Puzzle Functionality
const passwordDisplay = document.getElementById('passwordDisplay');
const clueInputs = document.querySelectorAll('.clue-input');
const checkPasswordBtn = document.getElementById('checkPassword');
const resetPuzzleBtn = document.getElementById('resetPuzzle');
const showHintBtn = document.getElementById('showHint');
const puzzleFeedback = document.getElementById('puzzleFeedback');
const puzzleHint = document.getElementById('puzzleHint');

// Correct password: AF&9@gt
const correctPassword = ['A', 'F', '&', '9', '@', 'G', 'T'];

// Update password display when inputs change
clueInputs.forEach(input => {
    input.addEventListener('input', function() {
        const index = parseInt(this.dataset.index);
        const value = this.value.toUpperCase();
        
        // Update the password display
        const passwordChars = passwordDisplay.querySelectorAll('.password-char');
        if (value) {
            passwordChars[index].textContent = value;
            passwordChars[index].classList.add('filled');
        } else {
            passwordChars[index].textContent = '_';
            passwordChars[index].classList.remove('filled');
        }
        
        // Move to next input automatically
        if (value && index < clueInputs.length - 1) {
            clueInputs[index + 1].focus();
        }
    });
    
    // Allow only one character
    input.addEventListener('keydown', function(e) {
        if (this.value.length >= 1 && e.key !== 'Backspace' && e.key !== 'Delete') {
            e.preventDefault();
        }
    });
});

// Check password function
checkPasswordBtn.addEventListener('click', function() {
    let userPassword = [];
    let allFilled = true;
    
    clueInputs.forEach((input, index) => {
        userPassword[index] = input.value.toUpperCase();
        if (!input.value) {
            allFilled = false;
        }
    });
    
    if (!allFilled) {
        puzzleFeedback.textContent = "Please fill in all the clues before checking!";
        puzzleFeedback.className = "puzzle-feedback error";
        return;
    }
    
    // Check if password is correct
    let correctCount = 0;
    userPassword.forEach((char, index) => {
        if (char === correctPassword[index]) {
            correctCount++;
            clueInputs[index].classList.add('correct');
            clueInputs[index].classList.remove('incorrect');
        } else {
            clueInputs[index].classList.add('incorrect');
            clueInputs[index].classList.remove('correct');
        }
    });
    
    if (correctCount === correctPassword.length) {
        puzzleFeedback.textContent = "Congratulations! You've cracked the password! 🎉";
        puzzleFeedback.className = "puzzle-feedback success";
        
        // Add celebration effect
        passwordDisplay.classList.add('success');
        setTimeout(() => {
            passwordDisplay.classList.remove('success');
        }, 2000);
    } else {
        puzzleFeedback.textContent = `You have ${correctCount} out of 7 correct. Keep trying!`;
        puzzleFeedback.className = "puzzle-feedback error";
    }
});

// Reset puzzle function
resetPuzzleBtn.addEventListener('click', function() {
    clueInputs.forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'incorrect');
    });
    
    const passwordChars = passwordDisplay.querySelectorAll('.password-char');
    passwordChars.forEach(char => {
        char.textContent = '_';
        char.classList.remove('filled');
    });
    
    puzzleFeedback.textContent = "Enter your answers above and click 'Check Password' to verify!";
    puzzleFeedback.className = "puzzle-feedback";
    puzzleHint.style.display = 'none';
});

// Show hint function
showHintBtn.addEventListener('click', function() {
    puzzleHint.style.display = puzzleHint.style.display === 'none' ? 'block' : 'none';
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation for Elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.principle-card, .protection-item, .role-card, .resource-category, .clue-item').forEach(el => {
    observer.observe(el);
});