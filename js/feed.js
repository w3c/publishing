/**
* Inspired by:
*
* http://jquery-plugins.net/FeedEk/FeedEk.html
*
* But had to re-engineer it for the usage at W3C. The main issue was that CORS made it impossible to use the original that relied
* on the googleapi service to turn the feed into JSON. Instead, the XML is used directly, relying on an Atom format
*
* @author: Ivan Herman, W3C
* @license: W3C Software License — https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

(function($) {
	$.fn.atomfeed = function(o) {
		var options = {
			url                : "test.xml",
			maxCount           : 3,
			printEntry : function(title, link, pubDate, descr) {
				var s = '<p><b>' + title + '</b></p>';
				s += '<p ><time>' + pubDate.getFullYear() + '-' + (pubDate.getMonth()+1) + '-' + pubDate.getDate() + '</time><br/>'
				s += '<a href="' + link + '">See content</a></p>';
				return(s);
			},
		};
		if(o) $.extend(options,o);
		/* This is where the new content should go */
		var id = $(this).attr("id");
		$.ajax({
			url: options.url,
			success: function(result) {
				var items = result.getElementsByTagName("item");
				for( var i = 0; i < items.length && i < options.maxCount; i++ ) {
					var item = items[i];
					var title   = item.getElementsByTagName("title")[0].textContent;
					var link    = item.getElementsByTagName("link")[0].textContent;
					var pubDate = new Date(item.getElementsByTagName("pubDate")[0].textContent);
					var descr   = item.getElementsByTagName("description")[0].textContent;
					var s = options.printEntry(title,link,pubDate,descr);
					$("#"+id).append(s);
				}
			}
		})
	}
})(jQuery)

/*
* This is a alternative printing of the RSS Content, abiding to the W3C home page style for the right panel.. Can be used as a
* replacement for the default, and simple content printing in the atomfeed plugin below
*/
var W3CFeedContentDpub = function(title, link, pubDate, descr) {
	var s = '<div class="side-news">';
	s += '<h3 class="h5 tPadding0 bPadding0 summary">' + title + '</h3>';
	s += '<p class="date"><time class="dtstart published">' + pubDate.getFullYear() + '-' + (pubDate.getMonth()+1) + '-' + pubDate.getDate() + '</time><br/>'
	s += '<a href="' + link + '">Continue reading →</a></p>';
	s += "</div>";
	return(s);
}

/*
* This is a alternative printing of the RSS Content, abiding to the W3C home page style in the main area. Can be used as a
* replacement for the default, and simple content printing in the atomfeed plugin below
*/
var W3CFeedContentMain = function(title, link, pubDate, descr) {
	var s = '<div class="main-news">';
	s += '<h3 class="h5 tPadding0 bPadding0 summary">' + title + '</h3>';
	s += '<p class="date"><time class="dtstart published">' + pubDate.getFullYear() + '-' + (pubDate.getMonth()+1) + '-' + pubDate.getDate() + '</time><br/>'
	s += descr + "<br/>";
	s += '<a href="' + link + '">Continue reading →</a></p>';
	s += "</div>";
	return(s);
}

$(document).ready( function() {
	// Add the blog references
	$("#dpubRss").atomfeed({
		//url: "https://www.w3.org/blog/dpub/category/activity-news/feed/",
		url: "https://cors-anywhere.herokuapp.com/https://www.w3.org/blog/dpub/category/activity-news/feed/",
		printEntry : W3CFeedContentDpub,
		maxCount : 3,
		showDescr: false,
	});
	$("#divRss").atomfeed({
		// url: "https://www.w3.org/blog/dpub/category/activity-news/feed/",
		url: "https://cors-anywhere.herokuapp.com/https://www.w3.org/blog/dpub/category/activity-news/feed/",
		printEntry : W3CFeedContentDpub,
		maxCount : 3,
		showDescr: false,
	});

	$("#mainRss").atomfeed({
		url: "https://www.w3.org/blog/category/digital-publishing/feed/",
		// url: "https://cors-anywhere.herokuapp.com/https://www.w3.org/blog/category/digital-publishing/feed/",
		printEntry : W3CFeedContentMain,
		maxCount : 3,
		showDescr: true,
	});
})
