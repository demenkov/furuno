//main function
jQuery(document).ready(function($) {
	//add events for functional buttons
	$(document).bind('keydown', 'f1', function (evt) { $('#f1').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f2', function (evt) { $('#f2').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f3', function (evt) { $('#f3').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f4', function (evt) { $('#f4').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f5', function (evt) { $('#f5').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f6', function (evt) { $('#f6').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f7', function (evt) { $('#f7').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f8', function (evt) { $('#f8').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f9', function (evt) { $('#f9').dropdown('toggle'); return false;});
	$(document).bind('keydown', 'f10', function (evt) { $('#f10').dropdown('toggle'); return false;});
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
		$($('#menu li.dropdown.open ul li a')[String.fromCharCode( e.which ).toLowerCase() - 1]).focus();
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
