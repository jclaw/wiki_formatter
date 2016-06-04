$(document).ready(function() {
	var matches = [];

	$('#raiseHierarchy').click(function() {
		raiseHierarchy();
	})

	$('#lowerHierarchy').click(function() {
		lowerHierarchy();
	})

	function raiseHierarchy() {
		modifyHeaders('raise');
	}

	function lowerHierarchy() {
		modifyHeaders('lower');
	}

	function modifyHeaders(operation) {
		var input = $('#wikiText').val();
		var inputLines = input.split('\n');
		var output = '';
		// if (matches.length == 0) {
		// 	matches = Array(inputLines.length).fill(0);
		// }
		// console.log(matches);

		for (var i = 0; i < inputLines.length; i++) {
			var line = inputLines[i];
			var numEqualChars = 0;
			var header;
			var regex = new RegExp('(^=+)([^=]*)(=+$)');
			var n = line.replace(regex, function(match, p1, p2, p3, offset, string) {
				if (p1 === p3) {
					// matches[i] = 1;
					if (operation == 'raise') {
						if (p1.length == 1) {
							return [p1, p2, p3].join('');
						} else {
							return [p1.slice(0,-1), p2, p3.slice(0,-1)].join('');
						}

					} else if (operation == 'lower') {
						return [p1 + '=', p2, p3 + '='].join('');
					}
				} else {
					return string;
				}
			});
			output += n;
			if (i < inputLines.length - 1) output += '\n';
		};
		$('#wikiText').val(output);
	}
})
