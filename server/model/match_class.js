module.exports = {
	Match: function(playerA, playerB, questions, answers, deleteCallback) {
		this.pA = playerA; 
		this.pB = playerB;
		var questionList = questions; // 5 question elements
		var answerList = answers; 
		var playerAScore = 0;
		var playerBScore = 0;
		var status = "START";

		this.start = function(){}; // call progress - create 5 rounds using the questions
		this.progress = function(){}; // call the five questions
		this.end =  function(){deleteCallback()}; // update leaderboard - declareWinner - (rematch/find another buttons)

		this.getQuestion = function(round){
			return questionList[round];
		}

		this.getAllQuestions = function(){
			return questionList;
		}

		this.checkAnswer = function(round, answer){
			return answerList[round] == answer;
		}
		this.getAnswers = function(){
			return answerList;
		}

		this.setStatus = function(s){
			status = s;
		}

		this.getStatus = function(){
			return status;
		}

	}

}