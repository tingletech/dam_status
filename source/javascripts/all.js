//= require jquery/dist/jquery
//= require uri.js/src/URI.js
//= require bootstrap/js/tooltip.js
//= require bootstrap/js/popover.js
$(function() {
  // $('body').popover({selector: '[rel=popover]', content: 'HEY'});
  $('[data-ucldc-collection]').each(each_collection);
  function each_collection() {
    var collection_registry_uri=URI($(this).data('ucldc-collection'));
    var registry_path = collection_registry_uri.directory()
    var registry_number = registry_path.substr(registry_path.lastIndexOf('/') + 1)
    var registry_info_link = $('<a rel="popover">CR'+ registry_number + '</a>');
    registry_info_link.bind('click', ajax_popover);
    $(this).append(registry_info_link);
  }
  function ajax_popover() {
    var collection_registry_uri = URI($($(this).parent()[0]).data('ucldc-collection'));
    var el = $(this);
    el.unbind('click');
    el.popover({content: 'HEY', placement: "auto"}).popover('show');
    collection_registry_uri = collection_registry_uri.addSearch('format','jsonp')
    jQuery.ajax(collection_registry_uri, function(d) {
        console.log("HEY2");
        console.log(d);
    });
  }
});
