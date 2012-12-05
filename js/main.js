//main function
jQuery(document).ready(function($) {

	//add events for functional buttons
	$(document).bind('keydown', 'f1', fnPressed);
	$(document).bind('keydown', 'f2', fnPressed);
	$(document).bind('keydown', 'f3', fnPressed);
	$(document).bind('keydown', 'f4', fnPressed);
	$(document).bind('keydown', 'f5', fnPressed);
	$(document).bind('keydown', 'f6', fnPressed);
	$(document).bind('keydown', 'f7', fnPressed);
	$(document).bind('keydown', 'f8', fnPressed);
	$(document).bind('keydown', 'f9', fnPressed);
	$(document).bind('keydown', 'f10', fnPressed);

	function fnPressed(e) {
		//hash of possible fn's
		var fnKeys = {112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
			120: "f9", 121: "f10", 122: "f11", 123: "f12"};
		$('#' + fnKeys[e.which]).click();
		return false;
	}
	//close all modal windows when pressed functional button
	$('.dropdown-toggle').on('click', function(){
		$('.modal').modal('hide');
	});
	//close all modal windows when pressed enter
	$(document).bind('keydown', 'return', function(e){ $('.modal').modal('hide'); return false;});

	//add events for numeric buttons
	$(document).bind('keydown', '1', numberPressed);
	$(document).bind('keydown', '2', numberPressed);
	$(document).bind('keydown', '3', numberPressed);
	$(document).bind('keydown', '4', numberPressed);
	$(document).bind('keydown', '5', numberPressed);
	$(document).bind('keydown', '6', numberPressed);
	$(document).bind('keydown', '7', numberPressed);
	$(document).bind('keydown', '8', numberPressed);
	$(document).bind('keydown', '9', numberPressed);
	$(document).bind('keydown', '0', numberPressed);

	//process numeric buttons
	function numberPressed(e) {
		//if opened menu and itrem with this index exisis focus on it
		$($('#menu li.dropdown.open ul li a')[String.fromCharCode( e.which ).toLowerCase() - 1]).click();
		return false;
	}

	var felcom = {
		lat		: null,
		lon		: null,
		init	: function() {
			var self = this;
			//set datetime counter
			self.time();
			setInterval(function(){self.time()}, 10);
			//set latitude and longitude
			ymaps.ready(function () {
				self.lat = ymaps.geolocation ? ymaps.geolocation.latitude : null;
				self.lon = ymaps.geolocation ? ymaps.geolocation.longitude : null;
				self.coordinates();
			});
		},
		time : function() {
			var date = new Date();
			$('#status span.date').html(
				date.toString("yy-MM-dd HH:mm" + ' (UTC)')
			);
		},
		coordinates : function() {
			if (this.lat) {
				var time = this.convertDegToTime(this.lat);
				var letter = (this.lat > 0) ? 'W' : 'E';
				$('#status span.lat').html(time.h + ':' + time.m + ':' + time.s + letter);
			}
			if (this.lon) {
				var time = this.convertDegToTime(this.lon);
				var letter = (this.lat > 0) ? 'N' : 'S';
				$('#status span.lon').html(time.h + ':' + time.m + ':' + time.s + letter);
			}
		},
		convertDegToTime : function(deg) {
			var degrees     = 0;
			var degreesTemp = 0.0;
			var minutes     = 0;
			var minutesTemp = 0.0;
			var seconds     = 0;
			var secondsTemp = 0.0;
			var isNegativeAngle;

			degrees     = Math.floor(deg);

			minutesTemp = deg - degrees;
			minutesTemp = 60.0 * minutesTemp;
			minutes     = Math.floor(minutesTemp);

			secondsTemp = minutesTemp - minutes;
			secondsTemp = 60.0 * secondsTemp;
			seconds     = Math.round(secondsTemp);

			seconds = (seconds.toString().length > 1) ? seconds : '0' + seconds;

			return {
				h:degrees,
				m:minutes,
				s:seconds
			};
		}
	};

	felcom.init();

});
