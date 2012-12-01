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
		lat		:0,
		lon		:0,
		init	: function() {
			var self = this;
			//set datetime counter
			self.time($('#status span.date'));
			setInterval(function(){self.time($('#status span.date'))}, 10);
		},
		time : function(el) {
			var date = new Date();
			$(el).html(
				date.toString("yy-MM-dd HH:mm" + ' (UTC)')
			);
		}
	};

	felcom.init();

});
