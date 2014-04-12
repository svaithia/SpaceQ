module.exports = {
    Question: function(url, q, c, right){
		this.qn = q;
		this.image = url;
		this.choices = c; // array of choices (4)
		this.correct = right;

		this.checkCorrect(player, answer) = function() {}; // 
	}
}