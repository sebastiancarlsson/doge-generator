var phrases = ["wow", "wow", "cool", "amaze"];

var app = angular.module('DogeGenerator', []);
app.controller("PhraseCtrl", ["$scope", function($scope) {
	$scope.phrases = phrases;

	$scope.updatePhrases = function() {
		var phrases = $scope.phrases.split(',');

		var str;
		for(var i = 0; i < phrases.length; i++) {
			// http://blog.stevenlevithan.com/archives/faster-trim-javascript
			str = phrases[i].replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(str == '') {
				phrases.splice(i, 1);
				i--;
			} else {
				phrases[i] = str;
			}
		}
		
		window.phrases = phrases;
	};
}]);

var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];
var sizes = ["small", "medium", "big"];
var text = [];

function getPhrase() {
	console.log(phrases);
	if(!phrases.length) { 
		return "wow"; 
	}
	var i = Math.floor(Math.random() * phrases.length);
	return phrases[i];
}

function getColor() {
	var i = Math.floor(Math.random() * colors.length);
	return colors[i];
}

function createText() {
	if(text.length > 250) {
		text[0].remove();
		text.shift();
	}

	var div = $('<div />').addClass('text');
	div.addClass( sizes[Math.floor(Math.random() * sizes.length)] )
	div.html(getPhrase());
	div.css('left', (Math.round(Math.random() * 100)) + "%");
	div.css('top', (Math.round(Math.random() * 100)) + "%");
	div.css('color', getColor());
	text.push(div);
	$('body').append(div);
}

setInterval(createText, 1000);
