/* Usage
   updateQuestionAnswer
   - question parameter: unknown...
   - answer parameter: array of answers (4)
   - imgsrc: link to image
   - Call to update the question
   
   updateTimer
   - playerA: playerA's current score
   - playerB: playerB's current score
   - Call to update the score
   
   roundOver()
   - call when the game is over
*/
function updateQuestionAnswer(question, answer, imgsrc){
	$('#question').attr('src', imgsrc);
	$('#answerA').html(answer[0]);
	$('#answerB').html(answer[1]);
	$('#answerC').html(answer[2]);
	$('#answerD').html(answer[3]);
}

function updateTimer(playerA, playerB){
	$('#score_a').attr('aria-valuetransitiongoal',playerA);
	$('#score_b').attr('aria-valuetransitiongoal',playerB);
	$('#p1').html(playerA);
	$('#p2').html(playerB);
	$('.progress-bar').progressbar();
	/*
	$('#timer_a').attr('style','height:' + playerA + '%');
	$('#timer_b').attr('style','height:' + playerB + '%'); */
}

function gameOver () {
	var a = document.getElementById('score_a').getAttribute('aria-valuetransitiongoal');
	var b = document.getElementById('score_b').getAttribute('aria-valuetransitiongoal');
	window.open ('results.html?a=' + a + '&b=' + b, '_self');
}

function countdown(callback) {
	var bar = document.getElementById('progress'),
	time = 0, max = 10;
	int = setInterval(function() {
		$('#progress').attr('aria-valuetransitiongoal',Math.floor(100 - time++ * max) + '');
		$('#timeTitle').html ('TIMER: ' + (max + 1 - time) + ' secs');
		$('.progress-bar').progressbar();
		if (time - 1 == max) {
			clearInterval(int);
			// 600ms - width animation time
			callback && setTimeout(callback, 600);
			startRound();
		}
	}, 1000);
}