/**
*
* Common functions used to display events and presentations
*
* @author: Ivan Herman, W3C
* @license: W3C Software License — https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

var months   = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var stringToDate = function(dateString) {
	/*
	* Split the (ISO Formatted) date string into a structure with day, month and year.
	* All values are stored as integegers.
	* Returns the day/month/year structure
	*/
	vals = dateString.split("-");
	return { day : vals[2]*1, month : vals[1]-1, year : vals[0]*1 }
}

var eventToString = function(event, date) {
	/*
	* Returns an HTML encoded string with the details of an event.
	* The full string is enclosed in an <li> element.
	* Depending on the presence (or not) of a URI, the entry is put into a link.
	*/
	var retval = "<li>";
	// Add an enclosing <a> element
	if( event.href === undefined ) {
		retval += "<a>";
	} else {
		retval += "<a href='" + event.href + "'>";
	}

	// The event title may be in a different language; take that into account
	if( event.lang === undefined ) {
		retval += event.event;
	} else {
		retval += "<span lang=" + event.lang + ">" + event.event + "</span>";
	}

	retval += "; " + event.place + ", ";
	// If there is no end date, the event is considered to be a one-day event
	if( event.dateEnd === undefined ) {
		retval += date.day + " " + months[date.month] + ", " + date.year;
	} else {
		dateEnd = stringToDate(event.dateEnd);
		if( date.month === dateEnd.month ) {
			retval += date.day + "-" + dateEnd.day + " " + months[date.month] + ", " + date.year;
		} else {
			retval += date.day + " " + months[date.month] + "-" + dateEnd.day + " " + months[dateEnd.month] + ", " + date.year;
		}
	}
  	return retval + "</a></li>";
};

var presentationToString = function(presentation, date) {
	/*
	* Returns an HTML encoded string with the details of a presentation.
	* The full string is enclosed in an <li> element.
	* Depending on the presence (or not) of a URI, the entry is put into a link.
	*/
	var retval = "<li>";
	if( presentation.href === undefined ) {
		retval += "<a>";
	} else {
		retval += "<a href='" + presentation.href + "'>";
	}
  	retval += "Presentation by " + presentation.presenter + " ";
	if( presentation.event !== undefined ) {
		retval += "at " + presentation.event;
	}
	if( presentation.lang !== undefined ) {
		retval += " (in " + presentation.lang + ")";
	}
	retval += "; " + presentation.place + ", ";
	retval += date.day + " " + months[date.month] + ", " + date.year;
	return retval + "</a></li>";
};
