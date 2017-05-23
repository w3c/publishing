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
	/* Get the JSON file; it retuns a Promise-like structure */
	$.getJSON("events.json")
		.done(function(events) {
			/*
			* Display all events with, if necessary, a separate header for the year
			* (The entries in the json file are supposed to be ordered by date!)
			*/
			// This is just a fake start way into the future...
			var year = 3000;
			var ul   = "";
			var main = $("#events");
			events.events.forEach(function(element, index, array) {
	        	var date = stringToDate(element.dateStart);
	        	var eyear = date.year;
	        	if( year > eyear ) {
					main.append("<h3>" + eyear + "</h3>");
					ul = $("<ul></ul>");
					main.append(ul);
					year = eyear;
				}
				ul.append(eventToString(element, date));
			});
    }).done( function(events) {
		/*
		* Display all the presentations with, if necessary, a separate header for the year
		* (The entries in the json file are supposed to be ordered by date!)
		*/
		var year = 3000;
		var ul   = "";
		var main = $("#presentations");
		events.presentations.forEach(function(element, index, array) {
			var date = stringToDate(element.date);
			var eyear = date.year;
			if( year > eyear ) {
				main.append("<h3>" + eyear + "</h3>");
				ul = $("<ul></ul>");
				main.append(ul);
				year = eyear;
			}
			ul.append(presentationToString(element, date));
		});
    });
})
