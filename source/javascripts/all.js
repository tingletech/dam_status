//= require jquery/dist/jquery
//= require uri.js/src/URI.js
//= require bootstrap/js/tooltip.js
//= require bootstrap/js/popover.js
$(function() {
  $('[data-ucldc-collection]').each(each_collection);
  function each_collection() {
    var collection_registry_uri=URI($(this).data('ucldc-collection'));
    var registry_path = collection_registry_uri.directory()
    var registry_number = registry_path.substr(registry_path.lastIndexOf('/') + 1)
    var registry_info_link = $('<a class="CR_pop">CR'+ registry_number + '</a>');
    registry_info_link.bind('click', ajax_popover);
    $(this).append(registry_info_link);
  }
  function ajax_popover() {
    var el = $(this);
    var collection_registry_uri = URI($(el.parent()[0]).data('ucldc-collection'));
    collection_registry_uri = collection_registry_uri.addSearch('format','jsonp');
    $.ajax({
      type : "GET",
      dataType : "jsonp",
      url : collection_registry_uri,
      success: function(data){
        el.unbind('click');
        el.popover(popover_template(data)).popover('show');
      }
    });
  }
  function popover_template(data) {
    var title = data.campus[0].slug
    if (data.repository[0]) {
      title = title + " " + data.repository[0].name;
    }
    return {
      title: title,
      content: data['name'],
      placement: "auto" 
    };
  }
});
