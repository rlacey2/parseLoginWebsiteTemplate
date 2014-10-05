// trying to catch the auto fill where the user selects from the dropdown
// e.g. an email once selected it may be correct

// comparing values, if the previous value is different to the current value, something changed it hence send the event trigger
//  cache a copy of the field data

// currently hacking this, rlacey version below

(function($) {
    $.fn.listenForChange = function(options) {
        settings = $.extend({
            interval: 200 // in microseconds
        }, options);

        var jquery_object = this;
        var current_focus = null;

        jquery_object.filter(":input").add(":input", jquery_object).focus( function() {
            current_focus = this;
        }).blur( function() {
            current_focus = null;
        });

        setInterval(function() {
            // allow
            jquery_object.filter(":input").add(":input", jquery_object).each(function() {
                // set data cache on element to input value if not yet set
                if ($(this).data('change_listener') == undefined) {
                    $(this).data('change_listener', $(this).val());
                    return;
                }
                // return if the value matches the cache
                if ($(this).data('change_listener') == $(this).val()) {
                    return;
                }
                // ignore if element is in focus (since change event will fire on blur)
         /*       if (this == current_focus) {
                    return;
                } */
                // if we make it here, manually fire the change event and set the new value
                $(this).trigger('change');
                $(this).data('change_listener', $(this).val());
            });
        }, settings.interval);
        return this;
    };
})(jQuery);




(function($) { //rlacey for a single field
    $.fn.listenForAutoComplete = function(options) {
    	
    	if (!options)
    	    {
    		options = {};
    		}
    	
        settings = $.extend({
            interval: 500, // in microseconds 
            enabled :true
            
            
        }, options);

        var jquery_object = this;
        var current_focus = null;

        jquery_object.focus( function() {
            current_focus = this;
        }).blur( function() {
            current_focus = null;
        });

        setInterval(function() { // set this function to trigger every interval milliseconds
            // allow
        	if (settings.enabled &&  jquery_object.val().length > 0)
        		jquery_object.trigger('change'); // fire this event

        }, settings.interval);
        return this;
    };
})(jQuery);










