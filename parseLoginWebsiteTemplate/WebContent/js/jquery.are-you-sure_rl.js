/*!
 * jQuery Plugin: Are-You-Sure (Dirty Form Detection)
 * https://github.com/codedance/jquery.AreYouSure/
 *
 * Copyright (c) 2012-2013, Chris Dance and PaperCut Software http://www.papercut.com/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:   chris.dance@papercut.com
 * Version:  1.5.0
 * Date:     15th Nov 2013
 * 
 * modified by rlacey November 2013
 * 
 * dirty means the form data has changed
 * isSafeToSave means the form is dirty and meets the minimum set of required fields, individually validated
 * 
 */
(function($) {
  $.fn.areYouSure = function(options) {
	  // settings, with default values, over written by the options passed in
    var settings = $.extend(
          {
            'message' : 'You have unsaved changes!',
            'dirtyClass' : 'dirty',
            'change' : null,
            'silent' : false,
             'saveFunction' : null,
             'validationFunction' : null,
             'dirtyFunction' : null,
             'cleanFunction' : null,
            'fieldSelector' : "select,textarea,input[type='text'],input[type='password'],input[type='checkbox'],input[type='radio'],input[type='hidden'],input[type='color'],input[type='date'],input[type='datetime'],input[type='datetime-local'],input[type='email'],input[type='month'],input[type='number'],input[type='range'],input[type='search'],input[type='tel'],input[type='time'],input[type='url'],input[type='week']"
          }, options);

    var getValue = function($field) {
      if ($field.hasClass('ays-ignore')
          || $field.hasClass('aysIgnore')
          || $field.attr('data-ays-ignore')
          || $field.attr('name') === undefined) {
        return null;
      }

      if ($field.is(':disabled')) {
        return 'ays-disabled';
      }

      var val;
      var type = $field.attr('type');
      if ($field.is('select')) {
        type = 'select';
      }

      switch (type) {
        case 'checkbox':
        case 'radio':
          val = $field.is(':checked');
          break;
        case 'select':
          val = '';
          $field.children('option').each(function(o) {
            var $option = $(this);
            if ($option.is(':selected')) {
              val += $option.val();
            }
          });
          break;
        default:
          val = $field.val();
      }

      return val;
    };

    var storeOrigValue = function() { // case a field value so we know if it changed
      var $field = $(this);
      $field.data('ays-orig', getValue($field));
    };

    var checkForm = function(evt) {
      var isFieldDirty = function($field) {
        return (getValue($field) != $field.data('ays-orig'));
      };

      var isDirty = false;
      var $form = $(this).parents('form');

      // Test on the target first as it's the most likely to be dirty.
      if (isFieldDirty($(evt.target))) {
        isDirty = true;
      }

      if (!isDirty) {
        $form.find(settings.fieldSelector).each(function() {
													          $field = $(this);
													          if (isFieldDirty($field)) {
													            isDirty = true;
													            return false; // break
													          }
													        });
      }

      markDirty($form, isDirty );  // 
    }; // checkForm
    
    var markDirty = function($form, isDirty ) {   // change the form state on the user interface
      var changed = isDirty != $form.hasClass(settings.dirtyClass); // was the form dirty already
      
      $form.toggleClass(settings.dirtyClass, isDirty); // change the class in the form for css red border 
      
      if (isDirty)  
       $form.trigger('saveable.areYouSure', [$form]); // send an event to show form has passed specific validation logic

      // Fire change event if required
      if (changed) {
        if (settings.change) settings.change.call($form, $form);

        if (isDirty)  
        	{

       // 	$form.trigger('dirty.areYouSure', [$form]); // send an event to show dirty
        	
        	if (settings.dirtyFunction)  settings.dirtyFunction(); // ui stuff etc
        	} 
        if (!isDirty) 
	        {
        	$form.trigger('clean.areYouSure', [$form]); // allow to leave page without warning
	        if (settings.cleanFunction)  settings.cleanFunction();
	        }
      }

    };

    var rescan = function() {
      var $form = $(this);
      var newFields = $form.find(settings.fieldSelector).not("[ays-orig]");
      $(newFields).each(storeOrigValue);
      $(newFields).bind('change keyup', checkForm);
    };
    
    
    var reinitialize = function () {  // update the cache of all field values, e.g. after a save
        var $form = $(this);
        var allFields = $form.find(settings.fieldSelector);
        $(allFields).each(storeOrigValue);

        markDirty($form, false );
    };

    if (!settings.silent) {
      $(window).bind('beforeunload', function() {
			        $dirtyForms = $("form").filter('.' + settings.dirtyClass); // is there one dirty form?
			        if ($dirtyForms.length > 0) {
			          // $dirtyForms.removeClass(settings.dirtyClass); // Prevent multiple calls?
			          return settings.message;
			        }
			      });
    }

     // this is doing the assigning of the events to the form element (ONLY) 
    return this.each(function(elem) {
      if (!$(this).is('form')) {
        return;
      }
      var $form = $(this);

      // this is the form submit
      $form.submit(function(event) {                   // if trapping externally, this will not be triggered hence handle outside
    	if (settings.saveFunction)
    		{ 
    		  // event.preventDefault();
    		   settings.saveFunction(event); // call the external logic to save the form data    
    		}
    	else
    		{
    		$form.removeClass(settings.dirtyClass);
    		}  
      });
      
      $form.bind('reset', function() { markDirty($form, false ); });
      // Add a custom events
      $form.bind('rescan.areYouSure', rescan);
      $form.bind('reinitialize.areYouSure', reinitialize);
      
      // bind two new events to the form
      $form.bind('saveable.areYouSure', function() {
    	  
    	  var isSafeToSave = true;
    	  if (settings.validationFunction)
    		  {
    	       isSafeToSave = settings.validationFunction();
              }
    	  
    	  // decide whether we can change the save button/input state
    	  if (isSafeToSave)
               $(this).find('input[type="submit"]').removeAttr('disabled');
    	  else
    		  $(this).find('input[type="submit"]').attr('disabled', 'disabled');
        });
      
      
      $form.bind('dirty.areYouSure', function() {
    	  $(this).find('input[type="submit"]').removeAttr('disabled');
        });
      
      
      $form.bind('clean.areYouSure', function() {
          $(this).find('input[type="submit"]').attr('disabled', 'disabled');
        });  
      
      var fields = $form.find(settings.fieldSelector);
      $(fields).each(storeOrigValue);                   // cache the current values
      $(fields).bind('change keyup', checkForm);
      
 
    });
  };
})(jQuery);
