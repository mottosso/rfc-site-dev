$(document).ready(function() {
	tableofContents();
	overviewPage();
});


$(function(){


	if ($("#overviewlist")[0]){

	  $('#overviewlist').mixItUp({
	  	selectors: {
			target: 'li'
		},
	  	animation: {
	  		enable: false,
	  		effects: 'fade'
	  	},
	  	layout: {
			display: 'block'
		},
	    load: {
	      filter: '.raw, .draft, .retired',
	      sort: 'myorder:desc'
	    },
	    controls: {
	      toggleFilterButtons: true
	    }
	  });


		$("#menu").stickOnScroll({
		    topOffset: $(".navbar-fixed-top").outerHeight(),
		    setWidthOnStick: true,
		    setParentOnStick: true,
		});


		$("body").on("stickOnScroll:onStick", function(ev, $stickyEle){
		    // ev.target = element that was made sticky - same as $stickyEle
		   

		    var introH = $(".navbar").outerHeight();
		    var menuH = $("#menu").outerHeight();

		    var offsetH = introH + menuH - 20

		    $("#overviewlist").css( { marginTop : offsetH + "px" } );

		    
		});


		$("body").on("stickOnScroll:onUnStick", function(ev, $stickyEle){
		    // ev.target = element that had Sticky removed - same as $stickyEle
		   $("#overviewlist").css( { marginTop : 0 } );
		});


	}


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
	// if ($("#overview")[0]){
	// 	var options = {
	// 	  valueNames: [ 'date', 'state', 'title', 'summary', 'tags'  ]
	// 	};

	// 	var overviewList = new List('overview', options);

	// 	overviewList.sort('date', { order: "desc" }); // Sorts the list in zxy-order based on names


	// 	$('#filter-draft').click(function() {
	// 	  overviewList.filter(function(item) {
	// 	    if (item.values().state == "draft") {
	// 	      return true;
	// 	    } else {
	// 	      return false;
	// 	    }
	// 	  });
	// 	  return false;
	// 	});

	// 	$('#filter-raw').click(function() {
	// 	  overviewList.filter(function(item) {
	// 	    if (item.values().state == "raw") {
	// 	      return true;
	// 	    } else {
	// 	      return false;
	// 	    }
	// 	  });
	// 	  return false;
	// 	});
	// 	$('#filter-none').click(function() {
	// 	  overviewList.filter();
	// 	  return false;
	// 	});

	// 	$('.dropdown-toggle').dropdown()
	// }
}
