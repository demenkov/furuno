//main function
jQuery(document).ready(function($) {

		var felcom = {
		lat		: null,
		lon		: null,
		init	: function() {
			var self = this;
			//set datetime counter
			self.update();
			setInterval(function(){self.update()}, 10);
			//set latitude and longitude
			ymaps.ready(function () {
				self.lat = ymaps.geolocation ? ymaps.geolocation.latitude : null;
				self.lon = ymaps.geolocation ? ymaps.geolocation.longitude : null;
				self.coordinates();
			});
		},
		update : function() {
			var date = new Date();
			$('#status span.date').html(
				date.toString("yy-MM-dd HH:mm" + ' (UTC)')
			);
			$('#status span.ncs').html(
				this.ncs
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

/*		    ____  _       __
		   / __ \(_)___ _/ /___  ____ ______
		  / / / / / __ `/ / __ \/ __ `/ ___/
		 / /_/ / / /_/ / / /_/ / /_/ (__  )
		/_____/_/\__,_/_/\____/\__, /____/
		                      /____/
*/

	$(document).bind('keydown', 'right', leftRightPressed);
	$(document).bind('keydown', 'left', leftRightPressed);
	$(document).bind('keydown', 'up', upDownPressed);
	$(document).bind('keydown', 'down', upDownPressed);

	//close all modal windows when pressed functional button
	$('.dropdown-toggle').on('click', function(){
		$('.modal').modal('hide');
	});
	//close all modal windows when pressed enter
	$(document).bind('keydown', 'return', function(e){
		$('.modal').modal('hide');
		//change current station settings
		$('.modal').children('.modal-body').find('.btn-group').each(function(){
			if ($(this).attr('felcom-key')) {
				felcom[$(this).attr('felcom-key')] = $(this).find('.active span.text').attr('felcom-val');
			}
		});
	});

	//process left and right buttons
	function leftRightPressed(e) {
		//if opened popup window change setting state
		var current = $('.modal:visible tr.active .btn-group button.active');
		var list = $('.modal:visible tr.active .btn-group button')
		var index = list.index(current);
		if (e.keyCode == 39 && list[index+1]) {
			list[index+1].click();
		}
		if (e.keyCode == 37 && list[index-1]) {
			list[index-1].click();
		}
		return false;
	}

	//process left and right buttons
	function upDownPressed(e) {
		var list = $('.modal:visible .modal-body tr');
		var current = $('.modal:visible .modal-body tr.active');
		var index = list.index(current);
		if (e.keyCode == 40 && index < list.length-1) {
			list.removeClass('active');
			$(list[index+1]).addClass('active').find('td:first a').focus();
		}
		if (e.keyCode == 38 && index > 0) {
			list.removeClass('active');
			$(list[index-1]).addClass('active').find('td:first a').focus();
		}
		return false;
	}

	$('.modal-body a').add('.modal-body button').on('click', function(){
		$(this).parents('tr').siblings('tr').removeClass('active');
		$(this).parents('tr').addClass('active');
	});

	$('.modal').on('show', function () {
		$(this).children('.modal-body').find('table tr:first').addClass('active');
		//set default station settings if it's isn't set
		$(this).children('.modal-body').find('.btn-group').each(function(){
			if ($(this).attr('felcom-key')) {
				if (!felcom[$(this).attr('felcom-key')]) {
					felcom[$(this).attr('felcom-key')] = $(this).find('.active span.text').attr('felcom-val');
				}
				else {
					$(this).find('.active').removeClass('active');
					$(this).find('[felcom-val="' + felcom[$(this).attr('felcom-key')] + '"]').parent().addClass('active');
				}
			}
		});
	});

	$('.modal').on('hide', function (e) {
		$(this).children('.modal-body').find('table tr').removeClass('active');
	});

	felcom.init();

});
