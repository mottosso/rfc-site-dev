$(document).ready(function() {
	tableofContents();
	overviewPage();
	$("#loading").hide();
});


//	HISTORICIZE AND AJAXIFY OUR SITE
jQuery(document).ready(function() {
	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	//	Catch all internally-focused links and push a new state.
	//	Note: External links will not be affected by this behavior.
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
		$("#loading").show();
	});

	History.Adapter.bind(window, 'statechange', function(){
		var State = History.getState();
		$.get(State.url, function(data){	// Use AJAX to get the new content.
			document.title = data.match(/<title>(.*?)<\/title>/)[1];
			$('.content').html($(data).find('.content')); 	// Pull the post we want out of the .content class.
															// If you change the class of the post container,
															// you must change it here!!!
			_gaq.push(['_trackPageview', State.url]);	// This updates Google Analytics with a visit to the new page.
														// If you don't use Google Analytics, you can safety comment or
														// remove that line.

            tableofContents(); //init toc function
			overviewPage(); //init overview function
			


			 $( "#loading" ).fadeOut( "slow", function() {	
			});

		});
	});
});


function tableofContents() {
	$('.toc').toc({
	    'selectors': 'h1', //elements to use as headings
	    'container': 'body', //element to find all selectors in
	    'smoothScrolling': true, //enable or disable smooth scrolling on click
	    'prefix': 'toc', //prefix for anchor tags and class names
	    'onHighlight': function(el) {}, //called when a new section is highlighted 
	    'highlightOnScroll': true, //add class to heading that is currently in focus
	    'highlightOffset': 50, //offset to trigger the next headline
	    'anchorName': function(i, heading, prefix) { //custom function for anchor name
	        return prefix+i;
	    },
	    'headerText': function(i, heading, $heading) { //custom function building the header-item text
	        return $heading.text();
	    },
	'itemClass': function(i, heading, $heading, prefix) { // custom function for item class
	  return $heading[0].tagName.toLowerCase();
	}
	});
}

function overviewPage(){
	if ($("#overview")[0]){
		var options = {
		  valueNames: [ 'date', 'state', 'title', 'summary', 'tags'  ]
		};

		var overviewList = new List('overview', options);

		overviewList.sort('date', { order: "desc" }); // Sorts the list in zxy-order based on names


		$('#filter-draft').click(function() {
		  overviewList.filter(function(item) {
		    if (item.values().state == "draft") {
		      return true;
		    } else {
		      return false;
		    }
		  });
		  return false;
		});

		$('#filter-raw').click(function() {
		  overviewList.filter(function(item) {
		    if (item.values().state == "raw") {
		      return true;
		    } else {
		      return false;
		    }
		  });
		  return false;
		});
		$('#filter-none').click(function() {
		  overviewList.filter();
		  return false;
		});

		$('.dropdown-toggle').dropdown()
	}
}
