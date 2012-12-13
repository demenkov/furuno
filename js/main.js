//main function
jQuery(document).ready(function($) {

		var felcom = {
		lat		: '54:43:12',
		lon		: '020:30:07',
		date	: new Date(),
		dte2port: '001',
		init	: function() {
			var self = this;
			//set datetime counter
			self.update();
			setInterval(function(){self.update()}, 10);

			var num = ['yy','MM','dd'];
			$('#date span').each(function(i){
				var d = self.date.toString(num[((i%2) > 0) ? Math.floor((i-1)/2) : i/2]);
				$(this).html(d[i%2]);
			});
			$('#dte2-port span').each(function(i){
				$(this).html(self.dte2port[i]);
			});
			var lat = this.lat.replace (/:/g, "");
			$('#lat span').each(function(i){
				$(this).html(lat[i]);
			});
			var lon = this.lon.replace (/:/g, "");
			$('#lon span').each(function(i){
				$(this).html(lon[i]);
			});
		},
		update : function() {
			var self = this;
			$('#status span.date').html(
				this.date.toString("yy-MM-dd HH:mm" + ' (UTC)')
			);
			$('#status span.ncs').html(
				this.ncs
			);
			var letter = (parseInt(this.lat) > 0) ? 'W' : 'E';
			$('#status span.lat').html(
				this.lat + letter
			);
			letter = (parseInt(this.lon) > 0) ? 'N' : 'S';
			$('#status span.lon').html(
				this.lon + letter
			);
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
		if ($('#menu li.dropdown.open ul li a').length) {
			$($('#menu li.dropdown.open ul li a')[String.fromCharCode( e.which ).toLowerCase() - 1]).click();
		}
		//if its inpit emulate change number and go to next
		else if($('.modal-body tr.active span.active').length) {
			var spans = $('.modal-body tr.active span'),
				current = $('.modal-body tr.active span.active');
			$(current).html(String.fromCharCode( e.which ).toLowerCase());
			if (spans.length-1 == $(spans).index(current)) {
				$($(spans)[0]).click();
			}
			else {
				$(current).next('span').click();
			}
		}
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
		//change current station settings
		$('.modal:visible').children('.modal-body').find('.btn-group').each(function(){
			if ($(this).attr('felcom-key')) {
				felcom[$(this).attr('felcom-key')] = $(this).find('.active span.text').attr('felcom-val');
			}
		});
		//change date
		var day, month, year;
		day = $($('.modal:visible .modal-body #date span')[0]).html() + $($('.modal:visible .modal-body #date span')[1]).html();
		month = $($('.modal:visible .modal-body #date span')[2]).html() + $($('.modal:visible .modal-body #date span')[3]).html();
		year = 20 + $($('.modal:visible .modal-body #date span')[4]).html() + $($('.modal:visible .modal-body #date span')[5]).html();
		if (day && month && year) {
			felcom.date.setFullYear(year,parseInt(month) - 1,day);
		}
		//change dte2 port
		var dte2port = $($('.modal:visible .modal-body #dte2-port span')[0]).html() +
			$($('.modal:visible .modal-body #dte2-port span')[1]).html() +
			$($('.modal:visible .modal-body #dte2-port span')[2]).html();
		if (dte2port) {
			felcom.dte2port = dte2port;
		}
		//change latitude
		var lat = $($('.modal:visible .modal-body #lat span')[0]).html() +
			$($('.modal:visible .modal-body #lat span')[1]).html() + ':' +
			$($('.modal:visible .modal-body #lat span')[2]).html() +
			$($('.modal:visible .modal-body #lat span')[3]).html() + ':' +
			$($('.modal:visible .modal-body #lat span')[4]).html() +
			$($('.modal:visible .modal-body #lat span')[5]).html();
		if (lat) {
			felcom.lat = lat;
		}
		//change longitude
		var lon = $($('.modal:visible .modal-body #lon span')[0]).html() +
			$($('.modal:visible .modal-body #lon span')[1]).html() +
			$($('.modal:visible .modal-body #lon span')[2]).html() + ':' +
			$($('.modal:visible .modal-body #lon span')[3]).html() +
			$($('.modal:visible .modal-body #lon span')[4]).html() + ':' +
			$($('.modal:visible .modal-body #lon span')[5]).html() +
			$($('.modal:visible .modal-body #lon span')[6]).html()
		if (lon) {
			felcom.lon = lon;
		}
		//close modal
		$('.modal').modal('hide');
	});

	//process left and right buttons
	function leftRightPressed(e) {
		//if opened popup window change setting state
		var current = $('.modal:visible tr.active .btn-group button.active');
		var list = $('.modal:visible tr.active .btn-group button')
		if (!current.length && !list.length) {
			list = $('.modal-body tr.active span');
			current = $('.modal-body tr.active span.active');
		}
		var index = list.index(current);
		if (e.keyCode == 39 && list[index+1]) {
			$(list[index+1]).click();
		}
		if (e.keyCode == 37 && list[index-1]) {
			list[index-1].click();
		}
		return false;
	}

	//process up and down buttons
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

	$('.modal-body td').on('click', function(){
		$(this).parents('tr').siblings('tr').removeClass('active');
		$(this).parents('tr').addClass('active').find('span:first').focus();
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
		//set all modal settings
		felcom.init();
	});

	$('.modal').on('hide', function (e) {
		$(this).children('.modal-body').find('table tr').removeClass('active');
	});

	//inputs emulators
	$('.modal-body tr span').on('click', function(){
		$(this).siblings('span').removeClass('active');
		$(this).addClass('active');
	});

	felcom.init();

/*		    ____                  __
 *		   /  _/___  ____  __  __/ /_
 *		   / // __ \/ __ \/ / / / __/
 *		 _/ // / / / /_/ / /_/ / /_
 *		/___/_/ /_/ .___/\__,_/\__/
 *		         /_/
 */
	$('#new-text').on('click', function(){
		$('div.text:first').show();
	});
	//open next window
	$(document).bind('keydown', 'Alt+v', function(){
		if ($('div.text:visible').next().length) {
			$('div.text:visible').hide().next().show();
		}
		else {
			$('div.text:visible').hide()
			$('div.text:first').show();
		}
		return false;
	});
});
