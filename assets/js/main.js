$(document).ready(function() {
	tableofContents();
	overviewPage();
	$("#loading").hide();
});

jQuery(document).ready(function($) {

    var siteUrl = 'http://'+(document.location.hostname||document.location.host);

    $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        e.preventDefault();
        History.pushState({}, "", this.pathname);
        $("#loading").show();
    });

    History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();
        $.get(State.url, function(data){
            document.title = $(data).find("title").text();
            $('.content').html($(data).find('.content'));
            _gaq.push(['_trackPageview', State.url]);
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
