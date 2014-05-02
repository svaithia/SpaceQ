module.exports = {
  Timer: function(){
//		var socket = skt;
		var counter = 11;

		this.countdown = function () {

			counter = 11;

//			var player_match_id = socket.player.match_id;

			// emit a signal every second to signal a new second
			var si = setInterval(function () {
				if (counter > 0) {
//					socket.broadcast.to(player_match_id).emit('new_second', {});
					counter--;
				}
				if (counter <= 0) {
					stopCountdown(si);
				}
			}, 1000);
		}

		function stopCountdown(siVar) {
			clearInterval(siVar);
		}

		this.getTime = function () {
			return counter;
		}
	}
};