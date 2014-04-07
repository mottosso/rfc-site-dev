$(document).ready(function() {
    $('.toc').toc();

	$('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 900, 'swing', function () {
	        window.location.hash = target;
	    });
	});

});



if ($(".spec-container")[0]){
	// Scrolling element

	// Cache our vars for the fixed sidebar on scroll
	var $sidebar = $('.toc');
	// Get & Store the original top of our #sidebar-nav so we can test against it
	var sidebarTop = $sidebar.position().top;
	// Edit the `- 10` to control when it should disappear when the footer is hit.
	var contentHeight = $('.col-md-7').outerHeight();

	// Add the function below to the scroll event
	$(window).scroll(fixSidebarOnScroll);


}


// On window scroll, this fn is called (binded above)
function fixSidebarOnScroll() {
    // Cache our scroll top position (our current scroll position)
    var windowScrollTop = $(window).scrollTop();

    // Add or remove our sticky class on these conditions
    if (windowScrollTop >= contentHeight || windowScrollTop <= sidebarTop) {
        // Remove when the scroll is greater than our #content.OuterHeight()
        // or when our sticky scroll is above the original position of the sidebar
        $sidebar.removeClass('sticky');
    }
    // Scroll is past the original position of sidebar
    else if (windowScrollTop >= sidebarTop) {
        // Otherwise add the sticky if $sidebar doesnt have it already!
        if (!$sidebar.hasClass('sticky')) {
            $sidebar.addClass('sticky');
        }
    }
}