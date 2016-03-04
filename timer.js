var handins = [
	["Project Selection", new Date(2016, 2, 6, 23, 59)],
	["Proposal Slides", new Date(2016, 2, 27, 23, 59)],
	["Proposal Presentations", new Date(2016, 2, 31, 23, 59)],
	["Preliminary Report", new Date(2016, 6, 8, 23, 59)],
	["Preliminary Presentation", new Date(2016, 6, 11, 23, 59)],
	["Final Report", new Date(2016, 9, 14, 23, 59)],
	["Final Presentation", new Date(2016, 10, 11, 23, 59)]
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
	// Now, I know I'm injecting HTML elements here, but I technical debt is something for future me.

	$(".hand-ins").empty();
	var ratio = 1.6;
	var maxSize = 80;
	var currentHandin = getNextHandInDate();
				
	var getSize = function(i){
		return i == currentHandin ?  maxSize : maxSize / ((i - currentHandin) * ratio);
	}

	var getOpacity = function(i){
		return i == currentHandin ?  1 - (1 / maxSize) * 10 : 1 - (1 / (maxSize / ((i - currentHandin) * ratio))) * 10 < 0.1 ? "0.0; display: none;" : i == currentHandin ?  1 - (1 / maxSize) * 10 : 1 - (1 / (maxSize / ((i - currentHandin) * ratio))) * 10; 
	}

	var getColor = function(date, i){
		if(date["days"] <= 30){
			return "bad";
		}
		else if(date["days"] <= 60){
			return "warn";
		}else{
			return "safe";
		}
	}

	var buildString = function(date, i){
		return "<span class='date " + getColor(date, i) + "'>" + date["days"] + " DAYS, " + date["hours"] + ":" + date["minutes"] + ":" + date["seconds"] + "</span>";
	}

	for(var i = handins.length - 1; i >= currentHandin; i--){
		$(".hand-ins").prepend('<p style="font-size: ' +  getSize(i) + '; opacity: ' + getOpacity(i) + '">' + handins[i][0].toUpperCase()  +'</p>' +
			'<p style="font-size: ' +  getSize(i) + '; opacity: ' + getOpacity(i) + '; padding-top: 0;">' + buildString(timeUntil(handins[i][1]), i) + '</p>');
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
