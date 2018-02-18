document.addEventListener("DOMContentLoaded", function() {
	window.onload = function() {
		startBtn.addEventListener("click", function() {
			document.getElementById("modal").style.display = "none";
			startBtn.style.display = "none";
		});
	};
	document.getElementById("newGameModal").style.display = "none";
	var url = "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean";
	var startBtn = document.getElementById("start");
	var question = document.querySelector("#mainQuestion");
	var questionCounter = 0;
	var submitBtn = document.getElementById("submit");
	var trueBtn = document.getElementById("true");
	var falseBtn = document.getElementById("false");
	var score = 0;
	var apiData;
	startBtn.addEventListener("click", function() {
		fetch(url).then(function(res) {
		// parsing info into JSON.
			return res.json();
		})
		.then(function(data) {
			apiData = data.results; // saving api info to update DOM with newQuestion function.
			question.textContent = data.results[questionCounter].question;
			var correctAnswer = data.results[questionCounter].correct_answer;
			var incorrectAnswer = data.results[questionCounter].incorrect_answers[0]; 

			submitBtn.addEventListener("click", function() {
				if(trueBtn.checked && correctAnswer === "True" && smallQuestionNumber !== 10) {
					updateQuestionNumber();
					newQuestion();
				} else if(falseBtn.checked && correctAnswer === "False" && smallQuestionNumber !== 10) {
					updateQuestionNumber();
					newQuestion();
				} else if (trueBtn.checked && correctAnswer === "False" && smallQuestionNumber !== 10) {
					updateQuestionNumber();
					newQuestion();
				} else if(falseBtn.checked && correctAnswer === "True" && smallQuestionNumber !== 10) {
					updateQuestionNumber();
					newQuestion();
				} else if(!falseBtn.checked && !trueBtn.checked) {
					alert("You must make a selection!");
				} else {
					newGame();
				}
			});
		});
	});

	function newGame(data) {
		document.getElementById("newGameModal").style.display = "block";
		document.getElementById("scoreResult").innerHTML = "Your score is " + score + " out of 10!";
		smallQuestionNumber = 0;
		questionCounter = 0;
		score = 0;
		submitBtn.click(); // Loads new question.
		document.getElementById("newGameBtn").addEventListener("click", function() {
			document.getElementById("newGameModal").style.display = "none";
			question.textContent = apiData[questionCounter].question;
		});
	}

	function newQuestion(data) {
		trueBtn.checked = false; // Removes check mark on next question load.
		falseBtn.checked = false;
		questionCounter++;
		score++;
		question.textContent = apiData[questionCounter].question;
	}

});

var smallQuestionNumber = 1;
function updateQuestionNumber() {
	smallQuestionNumber++;
	document.getElementById("smallQuestionNumber").innerHTML = "Question " + smallQuestionNumber + " of 10";
}




