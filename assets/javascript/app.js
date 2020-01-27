
var panel = $('#quiz-area');
var countStartNumber = 30;

//Click Events 


$(document).on('click', '#start-over', function(e){
    game.reset();
});

$(document).on("click", ".answer-button", function(e){
    game.clicked(e);
});

$(document).on("click", "#start", function(e){
    $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    game.loadQuestion();
});


//Questions//


var questions = [{
    question: "What motto does Simba learn from Timon and Pumbaa?",
    answers:  ["Carpe Diem", "Hakuna Matata", "Yolo", " Veni, Vidi, Vici"],
    correctAnswer: "Hakuna Matata",
    image: "assets/images/lion.gif" 
}, {
    question: "When will the last petal fall from the enchanted rose?",
    answers:  ["No one knows", "7 Years from the Day of the Curse", "When the Beast turns 21", "When the Beast finds true love"],
    correctAnswer: "When the Beast turns 21"  ,
    image: "assets/images/beauty.gif" 
}, {
    question: "In what Disney animated feature is Earth referred to as \"Section 17, Area 51\"?",
    answers:  ["Hercules", "Lilo and Stitch", "Atlantis", "Treasure Planet"],
    correctAnswer: "Lilo and Stitch",
    image: "assets/images/lilo.gif" 
}, {
    question: "What time does the royal ball start in Cinderella?",
    answers: ["9PM", "7PM", "10PM", "8PM"] ,
    correctAnswer: "8PM",
    image: "assets/images/cinderella.gif" 
}, {
    question: "Who was the first Disney princess with a tattoo?",
    answers:  ["Mulan", "Jasmine", "Pocahontas", "Merida"],
    correctAnswer: "Pocahontas",
    image: "assets/images/pocahontas.gif" 
}, {
    question: "What is Jafar's official title?",
    answers:  ["Royal Chancellor", "Royal Physician", "Royal Advisor", "Royal Vizier"],
    correctAnswer: "Royal Vizier",
    image: "assets/images/aladdin.gif" 
}, {
    question: "How many brothers does Hans of the Southern Isles have?",
    answers: ["0", "4", "8", "12"],
    correctAnswer: "12",
    image: "assets/images/frozen.gif" 
}, {
    question: "What is Mulan's male name?",
    answers:  ["Ling", "Ying", "Jing", "Ping"],
    correctAnswer: "Ping",
    image: "assets/images/mulan.gif" 
}, {
    question: "What is Boo's real name in Moster's Inc.?" ,
    answers: ["Mary", "Alice", "Suzie", "Ashley"],
    correctAnswer: "Mary",
    image: "assets/images/boo.gif" 
}];



var game = {
    questions: questions,
    currentQuestion: 0, 
    counter: countStartNumber, 
    correct: 0, 
    incorrect: 0,
    countdown: function(){
        game.counter--;
        $("#counter-number").html(game.counter);

        if (game.counter === 0){
            console.log("TIME'S UP");
            game.timeUp();
        }
    },


    loadQuestion: function(){
        timer = setInterval(game.countdown, 1000);
        panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
            panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
        }
    },

    nextQuestion: function(){
        game.counter = countStartNumber;
        $('#counter-number').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function(){
        clearInterval(timer);
        $("#counter-number").html(game.counter);

        panel.html('<h2>Out of Time!</h2>');
        panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
        panel.append('<img src"' + questions[this.currentQuestion].image + '" />');

        if (game.currentQuestion === questions.length - 1){
            setTimeout(game.results, 3 * 1000);
        } else {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
    },

    results: function() {
        clearInterval(timer);

        panel.html('<h2>You did it, here is how well you did!</h2>');
        $('#counter-number').html(game.counter);
        panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
        panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
        panel.append('<h3>Unanswered ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
        panel.append('<br><button id="start-over">Start Over?</button.');
    },

    clicked: function(e) {
        clearInterval(timer);

        if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
            this.answeredCorrectly();
        }else {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function() {
        game.incorrect++;
        clearInterval(timer);
        panel.html('<h2>Nope!</h2>');
        panel.html('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 3 * 1000);
        } else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },
      answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        panel.html('<h2>Correct!</h2>');
        panel.append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if (game.currentQuestion === questions.length - 1){
          setTimeout(game.results, 3 * 1000);
        } else {
          setTimeout(game.nextQuestion, 3 * 1000);
        }
      },

    reset: function(){
        this.currentQuestion = 0;
        this.counter = countStartNumber;
        this.correct = 0; 
        this.incorrect = 0;
        this.loadQuestion();
    },
}