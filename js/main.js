$(document).ready(function() {
	var work = 25;
	var rest = 5;
	var running = false;
	var workTime = work * 60000;
	var restTime = rest * 60000;
	var centralTime = 0;
	var restTitle = $("#restTitle").html();
	var workTitle = $("#workTitle").html();
	var phaseSwitch = true;
	var alarm = new Audio("./assets/alarm.mp3");

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
		restTime = rest * 60000;
		updater(tag)(rest.toString());
		if (!running && $("#headline").html() == restTitle) {
			updater($("#mainTime"))(timedisplay(restTime));
		}
	});

	$("#restDown").click(function() {
		var tag = $("#restCounter");
		rest--;
		restTime = rest * 60000;
		updater(tag)(rest.toString());
		if (!running && $("#headline").html() == restTitle) {
			updater($("#mainTime"))(timedisplay(restTime));
		}
	});

	$("#workUp").click(function() {
		var tag = $("#workCounter");
		work++;
		workTime = work * 60000;
		updater(tag)(work.toString());
		if (!running && $("#headline").html() == workTitle) {
			updater($("#mainTime"))(timedisplay(workTime));
		}
	});

	$("#workDown").click(function() {
		var tag = $("#workCounter");
		work--;
		workTime = work * 60000;
		updater(tag)(work.toString());
		if (!running && $("#headline").html() == workTitle) {
			updater($("#mainTime"))(timedisplay(workTime));
		}
	});

	// configure the main timer
	function startTimer() {
		secondTimer = setInterval(function() {
			centralTime -= 1000;
			updater($("#mainTime"))(timedisplay(centralTime));
		}, 1000);
	}

	// configure the phase switcher
	function timeOut() {
		if (centralTime <= 0) {
			alarm.play();
			clearInterval(secondTimer);
			if ($("#headline").html() == restTitle) {
				updater($("#headline"))(workTitle);
				workTime = work * 60000;
				centralTime = workTime;
				phaseSwitch = true;
			}
			else {
				updater($("#headline"))(restTitle);
				restTime = rest * 60000;
				centralTime = restTime;
				phaseSwitch = true;
			}
			updater($("#mainTime"))(timedisplay(centralTime));	
		}
		startTimer();
		if (phaseSwitch == true) {
			phaseTimer = setTimeout(function() {
				phaseSwitch = false;
				timeOut();
			}, centralTime + 1000);
		}	
	}

	// configure buttons that affect timer
	$(".glyphicon-play").click(function() {
		running = true;
		phaseSwitch = true;
		if ($("#headline").html() == restTitle) {
			centralTime = restTime;
		}
		else {
			centralTime = workTime;
		}
		timeOut();
	}); 

	// pauses the timer
	$(".glyphicon-pause").click(function() {
		clearInterval(secondTimer);
		clearTimeout(phaseTimer);
		if ($("#headline").html() == restTitle) {
			restTime = centralTime;
		}
		else {
			workTime = centralTime;
		}
	});

	$(".glyphicon-repeat").click(function() {
		running = false;
		clearInterval(secondTimer);
		clearTimeout(phaseTimer);
		updater($("#headline"))(workTitle);
		workTime = work * 60000;
		restTime = rest * 60000;
		updater($("#mainTime"))(timedisplay(workTime));
	});
});