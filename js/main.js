$(document).ready(function() {
	var work = 25;
	var rest = 5;
	var running = false;
	var workTimer = 0;
	var restTimer = 0;

	// closure for updating html
	function updater(tag) {
		function inserter(content) {
			return tag.html(content);
		}
		return inserter;
	}

	// function for displaying time
	function timedisplay(miliseconds) {
		miliseconds = Math.floor(miliseconds/1000);
		var seconds = (miliseconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
		var minutes = (Math.floor(miliseconds/60)).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
		return minutes + ":" + seconds;
	}

	// configure buttons that change times
	$("#restUp").click(function() {
		var tag = $("#restCounter");
		rest++;
		restTimer = rest * 60000;
		updater(tag)(rest.toString());
		if (!running && $("#headline").html() == "Rest") {
			updater($("#mainTime"))(timedisplay(restTimer));
		}
	});

	$("#restDown").click(function() {
		var tag = $("#restCounter");
		rest--;
		restTimer = rest * 60000;
		updater(tag)(rest.toString());
		if (!running && $("#headline").html() == "Rest") {
			updater($("#mainTime"))(timedisplay(restTimer));
		}
	});

	$("#workUp").click(function() {
		var tag = $("#workCounter");
		work++;
		workTimer = work * 60000;
		updater(tag)(work.toString());
		if (!running && $("#headline").html() == "Work") {
			updater($("#mainTime"))(timedisplay(workTimer));
		}
	});

	$("#workDown").click(function() {
		var tag = $("#workCounter");
		work--;
		workTimer = work * 60000;
		updater(tag)(work.toString());
		if (!running && $("#headline").html() == "Work") {
			updater($("#mainTime"))(timedisplay(workTimer));
		}
	});
/*
	// configure buttons that affect timer
	$(".glyphicon-play").click(function() {
		running = true;
		workTimer = work * 60000;
		restTimer = rest * 60000;
		var displayString = "";

		// generic function for counting down time
		function timer(type) {
			if (type == "work") {
				clearInterval(secondTimer);
				setTimeout(timer("rest"), workTimer);
			}
			else if (type == "rest") {
				clearInterval(secondTimer);
				setTimeout(timer("work"), restTimer);
				}
			}

		}

		// start timer

	});

	$(".glyphicon-stop").click(function() {

	});

	$(".glyphicon-repeat").click(function() {
		running = false;
	});
*/
});