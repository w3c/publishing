/**
*
* Display, as a simple list, the events and the presentations.
* Relies on the functions and variable defined in dpub-common.js.
*
* To be used for 'events.html'
*
* @author: Ivan Herman, W3C
* @license: W3C Software License — https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
$(document).ready( function() {
	function display_testimonials(main, list) {
		list.forEach(function(element, index, array) {
			let div = $("<div class='testimonial'></div>");
			main.append(div);
			let p = $("<p class='testimonial_text'></p>");
			p.append(element.quote);
			let author = $("<p class='testimonial_author'></p>");
			author.append(element.attribution);
			div.append(p);
			div.append(author);
		});
	}

	/* Get the JSON file; it returns a Promise-like structure */
	$.getJSON("testimonials.json")
		.done(function(testimonials) {
			display_testimonials($("#current_testimonials"), testimonials.current);
			display_testimonials($("#past_testimonials"), testimonials.past);
		})
})
