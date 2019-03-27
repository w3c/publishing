/**
*
* Display testimonials in a round-robin way.
*
*
* @author: Ivan Herman, W3C
* @license: W3C Software License — https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
var quote_rotate = (function() {
	$.getJSON("testimonials.json")
	  .done(function(tdata) {
			var quotes        = tdata.current;
		 	var quoteindex    = 0;     // Current quote index
		 	var fadetime      = 1200;  // Length of time to spend fading
		 	var timerinterval = 13000; // How long to wait before changing the quote
			var automatic     = true

		 	function rotatequote() {
		 		quoteindex = (quoteindex + 1) % quotes.length;
		 		changequote_withfade(quoteindex);
		 	}

		 	function rotatequotereverse() {
		 		  quoteindex = (quoteindex <= 0 ? quotes.length - 1 : quoteindex - 1);
		 		  changequote_withfade(quoteindex);
		 	}

		 	function changequote_withfade(index) {
		 		$("#quoteblock-inner").fadeOut(fadetime, function() { changequote(quoteindex); }).fadeIn(fadetime);
		 	}

		 	function changequote(index) {
		 		$.each(quotes[index], function(tag, text) {
		 			if(tag == "image") {
		 				$("#quoteblock-tag-image").attr("src", text);
		 			} else {
		 				$("#quoteblock-tag-" + tag).html(text);
						$("#quoteblock-tag-quote").css('text-align', 'justify')
		 			}
		 		});
		 	}

		 	$(document).ready(function() {
		 		var quotetimer = $.timer(timerinterval, function() {
		 			rotatequote();
		 		});

				var pause_reel = function($button) {
					automatic = false;
					quotetimer.pause();
					$button.attr({
						'src'          : 'home-page-imgs/resume.png',
						'aria-checked' : 'false'
					});
				}

				var resume_reel = function($button) {
					automatic = true;
					quotetimer.resume();
					$button.attr({
						'src'          : 'home-page-imgs/pause.png',
						'aria-checked' : 'true'
					});
				}

				// Set up the event handlers for the testimonial related clicks
				$("#pre_button").click(function() {
					rotatequotereverse();
					pause_reel($("#pause_button"));
				});
				$("#next_button").click(function() {
					rotatequote();
					pause_reel($("#pause_button"));
				});
				$("#pause_button").click(function() {
					// Pause/resume the automatic rotation of testimonials
					if( automatic === true ) {
						pause_reel($(this));
					} else {
						resume_reel($(this));
						rotatequote();
					}
				});

		 		// Load the first quote
		 		changequote(quoteindex);
		 	});
	 })
	 .fail(function( jqxhr, textStatus, error ) {
	     console.log(textStatus + ", " + error);
	 });
}());
