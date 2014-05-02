module.exports = {
	Match: function(playerA, playerB, questions, answers, deleteCallback) {
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


		var statusObject = {
			status : "START",
			round : 0,
			scoreSubmitted : []
		}

		this.start = function(){}; // call progress - create 5 rounds using the questions
		this.progress = function(){}; // call the five questions
		this.end =  function(){deleteCallback()}; // update leaderboard - declareWinner - (rematch/find another buttons)

		this.player0or1 = function(player){
			if(players[0].a == player){
				return 0;
			} else if(players[1].b == player){
				return 1;
			} else{
				return 0;
			}
		}

		this.getQuestion = function(){
			return questionList[statusObject.round];
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
			return status;
		}

		this.incrementRound = function(){
			return statusObject.round++;
		}

		this.getRound = function(){
			return statusObject.round;
		}

		this.updateScore = function(player, score){
			var idx = player0or1(player);
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

		this.getScore = function(){
			return [players[0].score, players[1].score];
		}


	}

}