$(document).ready(function() { 

    var currentQuestion;
    var correctAnswer = 0;
    var incorrectAnswer = 0; 
    var unanswered = 0; 
    var seconds;
    var time; 
    var answered; 
    var userSelect;

    var messages = { 
        correct: "Yep, that's correct!",
        incorrect: "No, that's not it.",
        endTime: "Out of time!",
        finished:"Let's see how you did."
    }

    var triviaQuestions = [
        {
            question: "During its earliest days in development, Windows was known by what name?",
            answerList: ["DOS Overlay","GDOS","Interface Manager"],
            answer: 2,
        },
        {
            question: "Before becoming Google's smartphone operating system, Android was being developed for what device?",
            answerList: ["In-car entertainment","Cameras","An open source game console"],
            answer: 1,
        },
        {
            question: "Which of these is the oldest web browser still in general use and development",
            answerList: ["Netscape","Lynx","Mosaic"],
            answer: 1,
        },
        {
            question: "Approximately how heavy was the first 1GB hard drive?",
            answerList: ["64 pounds (29 kg)","8 pounds (3.6kg)","188 pounds (85kg)"],
            answer: 1,
        },
        {
            question: "What was the world's first digital, programmable robot?",
            answerList: ["The Stanford Arm","Unimate","The Johns Hopkins Beast"],
            answer: 1
        }];

    $("#start").on("click", function() { 
        $(this).hide()
        newGame();  
    });

    function newGame() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        currentQuestion = 0;
        correctAnswer = 0;
        incorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }
    
    function newQuestion() { 
        $("#message").empty();
        $("#correctedAnswer").empty();
        answered = true;

        $("#currentQuestion").html('question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
        $("#question").html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');

        for (var i = 0; i < 4; i++) { 
            var choices = $("<div>");
            choices.text(triviaQuestions[currentQuestion].answerList[i]);
            choices.attr({"data-index": i});
            choices.addClass("thisChoice");
            $("#answerList").append(choices);
        }

        countdown();

        $(".thisChoice").on("click",function() { 
            userSelect = $(this).data('index');
            clearInterval(time);
            answerPage();
        });
    };

    function countdown() {
        seconds = 15;
        $("#timeLeft").html("<p> " + seconds + " </p>");
        answered = true;
        time = setInterval(showCountdown, 1000);
    };

    function showCountdown() {
        seconds--;
        $("#timeLeft").html("<p> " + seconds + " </p>");
        if (seconds < 1) { 
            clearInterval(time);
            answered = false;
            answerPage(); 
        }
    }

    function answerPage() {
        $("#currentQuestion").empty(); 
        $(".thisChoice").empty(); 
        $("#question").empty();


        var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
        var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

        if ((userSelect === rightAnswerIndex) && (answered == true)) {
            correctAnswer++;
            $("#message").html(messages.correct);
        } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
            incorrectAnswer++;
            $("#message").html(messages.incorrect);
            $("#correctedAnswer").html('the correct answer was: ' + rightAnswerText);
        } else {
            unanswered++;
            $("#message").html(messages.endTime);
            $("#correctedAnswer").html('the correct answer was: ' + rightAnswerText);
            answered = true;
        }

        if (currentQuestion === (triviaQuestions.length-1)) { 
            setTimeout(scoreboard, 3000);
        } else { 
            currentQuestion++;
            setTimeout(newQuestion, 3000);
        }

    };


        function scoreboard() { 
            $("#timeLeft").empty(); 
            $("#message").empty(); 
            $("#correctedAnswer").empty(); 

            $("#finalMessage").html(messages.finished); 
            $("#correctAnswers").html("Correct answers: " + correctAnswer); 
            $("#incorrectAnswers").html("Incorrect answers: " + incorrectAnswer); 
            $("#unanswered").html("unanswered: " + unanswered);
            
            $("start").show();
        }

});


