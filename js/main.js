//main function
jQuery(document).ready(function($) {

		var felcom = {
		lat		: '54:43:12',
		lon		: '020:30:07',
		date	: new Date(),
		dte2port: '001',
		disk	: false,
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
		},
		new : function() {
			$('#workarea .message.active').toggleClass('active');
			var num = $('#workarea .message').not('.disk').length + 1;
			$('#workarea').append('<div class = "message" tabindex="-1"><div class="modal-header"><span>&lt;UNTITLED:' + num + '&gt;</span></div><div class="modal-body"><textarea></textarea></div></div>').show();
			$('#workarea .message').not('.disk').last().toggleClass('active');
		},
		open : function() {
			if (felcom.checkdisk()) {
				$('#disk-message-dialog').off('hide');
				//fill message open table
				$('#disk-message-dialog table tr:has(td)').remove();
				$('#disk-message-dialog .modal-body p.count').remove();
				$('.message.disk').each(function(i){
					var title = $(this).find('.modal-header span').html().slice(4,12).split('&gt;')[0];
					var size = $(this).find('.modal-body textarea').val().length;
					var date = $(this).attr('msg-date');
					var time = $(this).attr('msg-time');
					$('#disk-message-dialog table').append('<tr><td><a> ' + title + '</a></td><td> ' + size + '</td><td> ' + date + '</td><td> ' + time + '</td></tr>');
				});
				$('<p class = "count">' + $('.message.disk').length + ' Files exists</p>').insertBefore('#disk-message-dialog .modal-body p');

				$('#disk-message-dialog').modal('show');
				$('#disk-message-dialog').on('hide', function(e) {
					//show message
					setTimeout(function(){
						$('#disk-loading').modal('show');
					}, 10);
					//blink diod
					felcom.loading = setInterval(function(){felcom.blink()}, 60);
					//call formatted thrught ten seconds
					var messages = $('#disk-message-dialog tr:has(a)');
					var selected = $('#disk-message-dialog tr.active');
					var index = messages.index(selected);
					setTimeout(function(){
						$('#disk-loading').modal('hide');
						felcom.opened(index);
					}, 5000);
					$('#disk-message-dialog').off('hide');
				});
			}
			return false;
		},
		opened : function(index) {
			if (felcom.checkdisk()) {
				clearInterval(felcom.loading);
				$('.message.active').removeClass('active');
				$($('.message')[index]).addClass('active loaded');
			}
			return false;
		},
		save : function() {
			if (felcom.checkdisk()) {
				$('#disk-dialog-save').off('hide');
				$('#disk-dialog-save').modal('show');
				$('#disk-dialog-save input').focus();
				$('#disk-dialog-save input').val($('.message.active .modal-header span').html().slice(4,12).split('&gt;')[0]);
				$('#disk-dialog-save').on('hide', function(e) {
					//show message
					setTimeout(function(){
						$('#disk-saving').modal('show');
					}, 10);
					//blink diod
					felcom.saving = setInterval(function(){felcom.blink()}, 60);
					//call formatted thrught ten seconds
					setTimeout(function(){
						$('#disk-saving').modal('hide');
						felcom.saved();
					}, 5000);
					$('.message.active')
						.addClass('disk loaded')
						.attr('msg-date', felcom.date.toString("yy-MM-dd"))
						.attr('msg-time', felcom.date.toString("HH:mm"))
						.find('.modal-header span')
						.html('&lt;' + $('#disk-dialog-save input').val() + '&gt;');
					$('#disk-dialog-save input').val('');
					$('#disk-dialog-save').off('hide');
				});
			}
			return false;
		},
		saved :  function() {
			if (felcom.checkdisk()) {
				clearInterval(felcom.saving);
			}
			return false;
		},
		remove : function() {
			var message = $('div.message.active');
			message.remove();
			return false;
		},
		switch : function() {
			var messages = $('div.message').not('.disk');
			if (felcom.disk) {
				messages = messages.add('div.message.loaded');
			}
			if (messages.length > 1) {
				var visible = messages.filter('.active');
					index = messages.index(visible);
				visible.toggleClass('active')
				if (messages.length-1 == index) {
					$(messages[0]).toggleClass('active');
				}
				else {
					$(messages[index+1]).toggleClass('active');
				}
			}
			return false;
		},
		format : function() {
			if (felcom.checkdisk()) {
				$('#disk-dialog-format').off('hide').find('tr').removeClass('active');
				$('#disk-dialog-format').modal('show');
				$('#disk-dialog-format').on('hide', function(e) {
					if (parseInt($(e.target).find('tr.active a').attr('confirm-value'))) {
						//show message
						setTimeout(function(){
							$('#disk-formatting').modal('show');
						}, 10);
						//blink diod
						felcom.formatting = setInterval(function(){felcom.blink()}, 60);
						//call formatted thrught ten seconds
						setTimeout(function(){
							$('#disk-formatting').modal('hide');
							felcom.formatted();
						}, 10000);
						//remove messages
						$('.message.disk').remove();
						$('#disk-dialog-format').off('hide');
					}
				});
			}
			return false;
		},
		formatted : function() {
			if (felcom.checkdisk()) {
				clearInterval(felcom.formatting);
				$('#disk-formatted').modal('show');
				setTimeout(function(){
					$('#disk-formatted').modal('hide');
				}, 3000);
			}
			return false;
		},
		//checks disk is inserted
		checkdisk : function() {
			if (!this.disk) {
				$('#disk-not-inserted').modal('show');
				$(document).on('keypress', function() {
					$('#disk-not-inserted').modal('hide');
					$(document).off('keypress');
				})
				return false;
			}
			return true;
		},
		poweronoff : function() {
			$('#monitor-button').toggleClass('enabled');
			$('#display').css('visibility', ($('#display').css('visibility') == 'hidden') ? 'visible' : 'hidden' );
			felcom.shutdown();
		},
		insertremove : function() {
			$('#floppy .button').toggleClass('enabled');
			this.disk = $('#floppy .button').hasClass('enabled');
			this.blink();
		},
		shutdown : function() {
			$('.modal').modal('hide');
			$('div.message').removeClass('active');
			//remove not saved messages
			$('div.message:not(.disk)').remove();
		},
		blink : function() {
			var diod = $('div.diod');
			$(diod).toggleClass('enabled');
			setTimeout(function() {
				$(diod).toggleClass('enabled');
			}, 30);
		},
		send : function() {
			$('#send').modal('show');
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
		else if ($('#send-menu').hasClass('dialog in')) {
			$($('#send-menu li a')[String.fromCharCode( e.which ).toLowerCase()-1]).click();
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
		year = 20 + $($('#system-setup .modal-body #date span')[0]).html() + $($('#system-setup .modal-body #date span')[1]).html();
		month = $($('#system-setup .modal-body #date span')[2]).html() + $($('#system-setup .modal-body #date span')[3]).html();
		day = $($('#system-setup .modal-body #date span')[4]).html() + $($('#system-setup .modal-body #date span')[5]).html();
		if (day && month && year) {
			felcom.date.setFullYear(year,parseInt(month) - 1,day);
		}
		//change dte2 port
		var dte2port = $($('#system-setup .modal-body #dte2-port span')[0]).html() +
			$($('#system-setup .modal-body #dte2-port span')[1]).html() +
			$($('#system-setup .modal-body #dte2-port span')[2]).html();
		if (dte2port) {
			felcom.dte2port = dte2port;
		}
		//change latitude
		var lat = $($('#ship-position .modal-body #lat span')[0]).html() +
			$($('#ship-position .modal-body #lat span')[1]).html() + ':' +
			$($('#ship-position .modal-body #lat span')[2]).html() +
			$($('#ship-position .modal-body #lat span')[3]).html() + ':' +
			$($('#ship-position .modal-body #lat span')[4]).html() +
			$($('#ship-position .modal-body #lat span')[5]).html();
		if (lat) {
			felcom.lat = lat;
		}
		//change longitude
		var lon = $($('#ship-position .modal-body #lon span')[0]).html() +
			$($('#ship-position .modal-body #lon span')[1]).html() +
			$($('#ship-position .modal-body #lon span')[2]).html() + ':' +
			$($('#ship-position .modal-body #lon span')[3]).html() +
			$($('#ship-position .modal-body #lon span')[4]).html() + ':' +
			$($('#ship-position .modal-body #lon span')[5]).html() +
			$($('#ship-position .modal-body #lon span')[6]).html()
		if (lon) {
			felcom.lon = lon;
		}
		//close modals
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
		var list = $('.modal:visible .modal-body tr:has(a)');
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
		$(this).children('.modal-body').find('table tr:has(a):first').addClass('active');
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
		felcom.new();
	});
	$(document).bind('keydown', 'Alt+n', function(){
		felcom.new();
	});
	//open next window
	$(document).bind('keydown', 'Alt+v', function(){
		felcom.switch();
	});
	//close window
	$(document).bind('keydown', 'Alt+x', function(){
		felcom.remove();
	});
	//open files from disk
	$('#open').on('click', function() {
		felcom.open();
	});
	$(document).bind('keydown', 'Alt+q', function(){
		felcom.open();
	});
	//save files to disk
	$('#save').on('click', function() {
		felcom.save();
	});
	$(document).bind('keydown', 'Alt+s', function(){
		felcom.save();
	});
	$('#format').on('click', function() {
		felcom.format();
	});
	$('#disk-dialog-format a').on('click', function() {
		$(this).closest('tr').addClass('active').siblings('tr').removeClass('active');
		$('.modal').modal('hide');
	});

/*		   ______            __             __
 *		  / ____/___  ____  / /__________  / /____
 *		 / /   / __ \/ __ \/ __/ ___/ __ \/ / ___/
 *		/ /___/ /_/ / / / / /_/ /  / /_/ / (__  )
 *		\____/\____/_/ /_/\__/_/   \____/_/____/
 */

	$('#monitor-button').on('click', function() {
		felcom.poweronoff();
	});

	$('#floppy .button').on('click', function() {
		felcom.insertremove();
	});

/*	   _____                __
 *	  / ___/___  ____  ____/ /
 *	  \__ \/ _ \/ __ \/ __  /
 *	 ___/ /  __/ / / / /_/ /
 *	/____/\___/_/ /_/\__,_/
 */
	$('#send-menu li a').on('click', function() {
		$('.modal').modal('hide');
		if ($(this).attr('href') == '#send') {
			felcom.send();
		}
	});

});
