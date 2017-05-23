/**
*
* Display events and the presentations, but possibly separated into time-filtered buckets.
* Relies on the functions and variable defined in dpub-common.js.
*
* To be used for 'Overview.html'
*
* @author: Ivan Herman, W3C
* @license: W3C Software License — https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
$(document).ready( function() {
	// We need a separate Date object to be able to compare with a date 6 months earlier.
	var today = new Date();
	if(today.getMonth() === 1 && today.getDate() === 29) {
		var lastHalfYear = new Date(today.getFullYear() - 1, 7, 29);
	} else {
		if( today.getMonth() > 6 ) {
			var lastHalfYear = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
		} else {
			var lastHalfYear = new Date(today.getFullYear() - 1, today.getMonth() + 6, today.getDate());
		}
	}

	$.getJSON("events.json")
	 .done(function(events) {
		 /*
		 * Display each event, but into two buckets: events in the future, and event in the last 6 months
		 */
		 events.events.forEach( function(element, index, array) {
			 var date = new Date(element.dateStart);
			 if( date > today ) {
				 $("#futureevents").append(eventToString(element, stringToDate(element.dateStart)));
			 } else if( date > lastHalfYear ) {
				 $("#pastevents").append(eventToString(element, stringToDate(element.dateStart)));
			 }
		 });
	 }).done(function(events) {
		 /*
		 * Display presentations in the last 6 months
		 */
		 events.presentations.forEach( function(element, index, array) {
			 var date = new Date(element.date);
			 if( date > lastHalfYear ) {
				 $("#presentations").append(presentationToString(element, stringToDate(element.date)));
			 }
		 })
	 }).fail(function(jqxhr, textStatus, error) {
		 console.log(textStatus + ", " + error);
	 });
})
