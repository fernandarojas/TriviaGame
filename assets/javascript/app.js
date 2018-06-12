$(document).ready(function() { 


    var correctAnswers = 0; 
    var incorrectAnswers = 0; 
    var unansweredQuestions = 0; 

    var timeLeft = 10; 
    var running = false;
    var intervalID;

    var indexQandA = 0; //index to load a different question each round without the game reset or screen refresh
    var answered = false; //variable to stop the timer if user has clicked on an answer
    var correct;

    var answered;
    var userChoice;

    var options = [
        {
            question: "During its earliest days in development, Windows was known by what name?",
            answer: ["DOS Overlay","GDOS","Interface Manager"],
            correct: 2,
        },
        {
            question: "Before becoming Google's smartphone operating system, Android was being developed for what device?",
            answer: ["In-car entertainment","Cameras","An open source game console"],
            correct: 1,
        },
        {
            question: "Which of these is the oldest web browser still in general use and development",
            answer: ["Netscape","Lynx","Mosaic"],
            correct: 1,
        },
        {
            question: "Approximately how heavy was the first 1GB hard drive?",
            answer: ["64 pounds (29 kg)","8 pounds (3.6kg)","188 pounds (85kg)"],
            correct: 1,
        },
        {
            question: "What was the world's first digital, programmable robot?",
            answer: ["The Stanford Arm","Unimate","The Johns Hopkins Beast"],
            correct: 1,
        }];
    


    
    $("#timerHolder").hide();
    $("#questionSet").hide();


    function startGame() { 
        $("#start").hide(); 
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        $("#timerHolder").show();
        $("#questionSet").show();
        displayQuestion();
    };

    $("#start").on("click", function() { 
        startGame(); 
    });



    function displayQuestion() { 
        answered = false; //allows time to be pushed back after round reset 
        timeLeft = 15;
        intervalID = setInterval(timer, 1000);
            if (answered === false) { 
                timer();
            };

        
        var question = options[indexQandA].question;

        $("#questionHolder").html("<p>" + question + "</p>");

            for (var i = 0; i < 3; i++) { 
                var answer = options[indexQandA].answer[i];
                $(".answerChoices").append("<h3 class=answersAll id="+ i +">" + answer + "</h3>");
            };

        $(".answersAll").click(function() { 
            correct = options[indexQandA].correct;
            var userChoice = $(this).attr("id"); 

            console.log(userChoice);
            console.log(correct);
            
            if (userChoice === correct) { 
                correctAnswers++;
                answered = true; 
                
                resetRound();
            } else { 
                answered = true; 
                incorrectAnswers++; 
                resetRound(); 
            };
            console.log("correct " + correctAnswers);
        });
    };

    function timer() { 
        if (timeLeft === 0) {
            answered = true; 
            clearInterval(intervalID);

            unansweredQuestions++;
            resetRound(); 
        } else if (answered === true) { 
            clearInterval(intervalID); 
        } else { 
            timeLeft--;
            $("#timer").html("<p> " + timeLeft + " </p>");
        }
    };


    function resetRound() { 
        $(".answersAll").remove(); 
        indexQandA++;

        if (indexQandA < options.length) {
            setTimeout(function() { 
                displayQuestion(); 
            }, 3000); 

        } else { setTimeout(function () { 
            //end of all questions
                $("#timer").remove();
                $("#questionHolder").html("<p> Game is Over! </p>");
                $(".answerChoices").append("<p class=answersAll end>Correct Answers: " + correctAnswers + "</p")
                $(".answerChoices").append("<p class=answersAll end>Incorrect Answers: " + incorrectAnswers+ "</p")
                $(".answerChoices").append("<p class=answersAll end>Unaswered Questions: " + unansweredQuestions + "</p")
                setTimeout(function() { 
                    location.reload();
                }, 5000);
            }, 3000);
        }
    };

});


