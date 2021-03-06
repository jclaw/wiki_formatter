$(document).ready(function() {

	$('#raiseHierarchy').click(function() {
		modifyHeaders('raise');
	})

	$('#lowerHierarchy').click(function() {
		modifyHeaders('lower');
	})

	function modifyHeaders(operation) {
		var input = $('#wikiText').val();
		var inputLines = input.split('\n');
		var output = '';

		for (var i = 0; i < inputLines.length; i++) {
			var line = inputLines[i];
			var regex = new RegExp('(^=+)([^=]*)(=+$)');
			var str = line.replace(regex, function(match, p1, p2, p3, offset, string) {
				if (p1 === p3) {
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
			output += str;
			if (i < inputLines.length - 1) output += '\n';
		};
		$('#wikiText').val(output);
	}
})
