module.exports = {
	Match: function(playerA, playerB, questions, answers, deleteCallback) {
		var questionList = questions; // 5 question elements
		var answerList = answers; 
		var players = [
			{
				'a' : playerA,
				'score' : 0
			},
			{
				'b' : playerB,
				'score' : 0
			}
		];


		var statusObject = {
			status : "START",
			round : 0,
			scoreSubmitted : []
		}

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
			if(typeof s == 'string'){
				statusObject.status = s;
			} else if(typeof s == 'object'){
				if(s.status == 'string'){
					statusObject.status = s.status;
				}
				if(s.round == 'number'){
					statusObject.round = s.round;
				}
				if(s.waitingForPlayer == 'number'){
					statusObject.waitingForPlayer = waitingForPlayer;
				}
			}
		}

		this.getStatus = function(){
			return status;
		}

		this.incrementRound = function(){
			return statusObject.round++;
		}

		this.updateScore = function(player, score){
			var idx = players.indexOf(player);
			if( idx != -1 && statusObject.scoreSubmitted.indexOf(player) != -1 && statusObject.scoreSubmitted.length < 2){
				statusObject.scoreSubmitted.push(player);
				players[idx].score += score;
				var player2submit = 1 - idx;
				if(statusObject.scoreSubmitted == 1){
					statusObject.status = 'SCORE_WAITING';
				} else {
					statusObject.status = 'ROUND_COMPLETED';
				}
			} else if(idx == -1 || scoreSubmitted.length >= 2){
				console.log("player doesn't believe OR enough scores submitted");
			} else{

			}
		}


	}

}