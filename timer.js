var handins = [
	["Project Selection", new Date(2016, 2, 6, 23, 59)],
	["Proposal Slides", new Date(2016, 2, 27, 23, 59)],
	["Proposal Presentations", new Date(2016, 2, 31, 23, 59)],
	["Preliminary Report", new Date(2016, 6, 8, 23, 59)],
	["Preliminary Presentation", new Date(2016, 6, 11, 23, 59)],
	["Final Report", new Date(2016, 9, 14, 23, 59)],
	["Final Presentation", new Date(2016, 10, 11, 23, 59)],
	["Death", new Date(2076, 9, 5, 18, 41)]
];

var total = 7;

function getNextHandInDate(){
	var value = 0;
	handins.forEach(function(x){
		if(Date.now() > x[1]){
			value += 1;
		} 
	});
	return value;
}

function renderHandins(){
	$(".hand-ins").empty();
	var ratio = 1.6;
	var maxSize = 80;
	var currentHandin = getNextHandInDate();
				
	var getSize = function(i){
		return i == currentHandin 
		? maxSize 
		: maxSize / ((i - currentHandin) * ratio);
	}

	var getOpacity = function(i){
		var opacity = i == currentHandin 
			?  1 - (1 / maxSize) * 10 
			: 1 - (1 / (maxSize / ((i - currentHandin) * ratio))) * 10;

		return opacity;
	}

	var getColor = function(date){
		if(date["days"] <= 30){
			return "bad";
		}
		else if(date["days"] <= 60){
			return "warn";
		}else{
			return "safe";
		}
	}

	var buildString = function(date){
		return date["days"] + " DAYS, " + date["hours"] + ":" + date["minutes"] + ":" + date["seconds"];
	}

	for(var i = handins.length - 1; i >= currentHandin; i--){
		
		var fontSize = getSize(i);
		var opacity = getOpacity(i);
		var handInDate = handins[i][1];

		var handIn = $("<p></p>");
		handIn.css("font-size", fontSize);

		var time = $("<p></p>");
		time.css("font-size", fontSize);
		time.css("padding-top", 0);

		if(opacity < 0.1){
			handIn.css("display", "none");
			time.css("display", "none");

		}else{
			handIn.css("opacity", opacity);
			time.css("opacity", opacity);
		}

		handIn.html(handins[i][0].toUpperCase());

		var span = $("<span></span");
		var timeLeft = timeUntil(handInDate);
		
		span.addClass("date");
		span.addClass(getColor(timeLeft));

		span.html(buildString(timeLeft));


		time.html(span);

		$(".hand-ins").prepend(time);
		$(".hand-ins").prepend(handIn);
	}
}

function timeUntil(endtime){
	var t = endtime.getTime() - Date.parse(new Date());
	var seconds = Math.floor((t / 1000) % 60 );
	seconds = seconds < 10 ? "0" + seconds : seconds;
	var minutes = Math.floor(( t / 1000 / 60) % 60 );
	minutes = minutes < 10 ? "0" + minutes : minutes;
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24 );
	hours = hours < 10 ? "0" + hours : hours;
	var days = Math.floor(t / (1000 * 60 * 60 * 24));
	return {
	  'total': t,
	  'days': days,
	  'hours': hours,
	  'minutes': minutes,
	  'seconds': seconds
	};
}
			
setInterval(renderHandins, 1000);
