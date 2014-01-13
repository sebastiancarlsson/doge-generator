
var vars = {};
var hrefParts = window.location.href.split('?');
var phrases;
if(hrefParts[1]) {
	$.each(hrefParts[1].split('&'), function(i, v) {
		v = v.split('=');
		vars[v[0]] = v[1];
	});


	phrases = decodeURIComponent(vars.w).replace(/\+/g, ' ').split(',');
} else {
	phrases = ["wow", "much cool", "lol"];
}

var app = angular.module('DogeGenerator', []);
// http://stackoverflow.com/questions/14995884/select-text-on-input-focus-in-angular-js
app.directive('selectOnClick', function () {
    // Linker function
    return function (scope, element, attrs) {
        element.bind('click', function () {
            this.select();
        });
    };
});
app.controller("DogeCtrl", ["$scope", function($scope) {
	$scope.phrases = phrases;
	$scope.url = "";

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

		$scope.updateURL();

		$scope.resetWords();
	};

	$scope.resetWords = function() {
		$('.text').remove();
		for(var i = 0; i < 25; i++) {
			createText();
		}
	}

	$scope.updateURL = function() {
		var encoded = [];
		$.each(phrases, function(i, v) {
			encoded.push(encodeURIComponent(v));
		});

		$scope.url = 'http://doge-generator.com/?w=' + encoded.join(',');

		//window.location.href = $scope.url;
	}

	$scope.showForm = function() {
		$('.form-container').show();
		$('#resetButton').hide();
		$('.divider').hide();
	}

	$scope.hideForm = function() {
		$('.form-container').hide();
		$('#resetButton').html('click here to open the form again').show();
		$('.divider').show();
	}

	$scope.showCredits = function() {
		$('.credits').show();
	}

	$scope.hideCredits = function() {
		$('.credits').hide();
	}

	$scope.updateURL();
}]);
app.controller("CreditsCtrl", ["$scope", function($scope) {

}]);

var colors = ["red", "green", "blue", "yellow", "magenta", "cyan"];
var sizes = ["small", "medium", "big"];

function getPhrase() {
	if(!phrases.length) { 
		return "wow"; 
	}
	var i = Math.floor(Math.random() * phrases.length);
	return phrases[i];
}

function createText() {
	var text = $('.text');
	if(text.length > 50) {
		text[0].remove();
	}

	var div = $('<div />').addClass('text');
	div.addClass( sizes[Math.floor(Math.random() * sizes.length)] )
	div.addClass( colors[Math.floor(Math.random() * sizes.length)] )
	div.html(getPhrase());
	div.css('left', (Math.round(Math.random() * 100)) + "%");
	div.css('top', (Math.round(Math.random() * 100)) + "%");
	$('body').append(div);
}

$(function(){
	for(var i = 0; i < 25; i++) {
		createText();
	}
	setInterval(createText, 500);
})