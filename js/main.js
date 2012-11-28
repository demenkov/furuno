//main function
jQuery(document).ready(function($) {
	jQuery(document).bind('keydown', 'f1', function (evt) { jQuery('#f1').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f2', function (evt) { jQuery('#f2').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f3', function (evt) { jQuery('#f3').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f4', function (evt) { jQuery('#f4').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f5', function (evt) { jQuery('#f5').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f6', function (evt) { jQuery('#f6').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f7', function (evt) { jQuery('#f7').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f8', function (evt) { jQuery('#f8').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f9', function (evt) { jQuery('#f9').dropdown('toggle'); return false;});
	jQuery(document).bind('keydown', 'f10', function (evt) { jQuery('#f10').dropdown('toggle'); return false;});

	jQuery(document).bind('keydown', '1', numberPressed);
	jQuery(document).bind('keydown', '2', numberPressed);
	jQuery(document).bind('keydown', '3', numberPressed);
	jQuery(document).bind('keydown', '4', numberPressed);
	jQuery(document).bind('keydown', '5', numberPressed);
	jQuery(document).bind('keydown', '6', numberPressed);
	jQuery(document).bind('keydown', '7', numberPressed);
	jQuery(document).bind('keydown', '8', numberPressed);
	jQuery(document).bind('keydown', '9', numberPressed);
	jQuery(document).bind('keydown', '0', numberPressed);

	//process numeric buttons
	function numberPressed(e) {
		//if opened menu and itrem with this index exisis focus on it
		$($('#menu li.dropdown.open ul li a')[String.fromCharCode( e.which ).toLowerCase() - 1]).focus();
		return false;
	}
});
