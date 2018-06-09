function resizer( selectors, w ) {
	jQuery(selectors).each(function() {
		var owidth = jQuery(this).attr('width');
		var oheight = jQuery(this).attr('height');
		if (owidth > w) {
			var newH = (oheight * w / owidth);
			jQuery(this).attr({
				width: w,
				height: newH
			});
		}; // endif
	});
}
jQuery(document).ready(function() {
	var bcw = jQuery('.bookimg').width();
	resizer('.books-text .attachment-book-thumb', jQuery('.books-text').width());
	jQuery('.book-content').width(bcw);

});