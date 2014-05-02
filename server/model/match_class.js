module.exports = {
	Match: function(playerA, playerB, questions, answers, tmr, deleteCallback) {
		var questionList = questions; // 5 question elements
		var answerList = answers; 
		var players = [
			{
				'player' : playerA,
				'score' : 0
			},
			{
				'player' : playerB,
				'score' : 0
			}
		];
		var timer = tmr;
		var isTimerStarted = false;

		var statusObject = {
			status : "START",
			round : 0,
			scoreSubmitted : []
		}

		this.start = function(){}; // call progress - create 5 rounds using the questions
		this.progress = function(){}; // call the five questions
		this.end =  function(){deleteCallback()}; // update leaderboard - declareWinner - (rematch/find another buttons)

		this.startRound = function() {
			timer.countdown();
			isTimerStarted = true;
		}

		this.getTime = function() {
			return timer.getTime();
		}

		this.getIsTimerStarted = function() {
			return isTimerStarted;
		}

		this.player0or1 = function(playerObj){
			if(players[0].player == playerObj){
				return 0;
			} else if(players[1].player == playerObj){
				return 1;
			} else{
				return 0;
			}
		}

		this.getQuestion = function(){
			return questionList[statusObject.round];
		}

		this.getPreviousQuestion = function(){
			return questionList[statusObject.round-1];
		}

		this.getAllQuestions = function(){
			return questionList;
		}

		this.checkAnswer = function(answer){
			return answerList[statusObject.round] == answer;
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
			return statusObject;
		}

		this.incrementRound = function(){
			return statusObject.round++;
		}

		this.getRound = function(){
			return statusObject.round;
		}

		this.updateScore = function(playerObj, score){
			// player
			var idx = this.player0or1(playerObj);
			if( idx != -1 && statusObject.scoreSubmitted.indexOf(playerObj) == -1 && statusObject.scoreSubmitted.length < 2){
				statusObject.scoreSubmitted.push(playerObj);
				players[idx].score += score;
				var player2submit = 1 - idx;
				if(statusObject.scoreSubmitted.length == 1){
					statusObject.status = 'SCORE_WAITING';
				} else {
					statusObject.status = 'ROUND_COMPLETED';
				}
			} else if(idx == -1 || statusObject.scoreSubmitted.length >= 2){
				console.log("player doesn't believe OR enough scores submitted");
			} else{

			}
		}

		this.getScore = function(){
			return [players[0].score, players[1].score];
		}

		this.getOpponent = function(playerObj){
			if(players[0].player == playerObj){
				return players[1].player;
			} else {
				return players[0].player;
			}
		}


	}

}