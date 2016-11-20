$.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};


var FormSetup = function(){
  $('form').on('submit', function(event){
    event.preventDefault();
    var data = $(this).serializeObject();
  });
}


var ASSetup = function(){
  var ARCHIVESPACE_USERNAME = "jlee";
  var ARCHIVESPACE_PASSWORD = "hackathon";
  var ARCHIVESPACE_URL = "http://data.library.amnh.org:8081/";
  var ARCHIVESPACE_PATHS = {
    LOGIN: "users/"+ARCHIVESPACE_USERNAME+"/login",
    EXPEDITION: "repositories/4/resources"  // http://archivesspace.github.io/archivesspace/api/#post-repositories-repo_id-resources
  };
  var DEFAULT_HEADERS = {"X-ArchivesSpace-Session":null};


  return {
    ASLogin: function(onSuccess, onError){
      $.post({
        url: ARCHIVESPACE_URL + ARCHIVESPACE_PATHS.LOGIN,
        password: ARCHIVESPACE_PASSWORD,
        success: function(resp){
          var response = JSON.parse(resp);
          DEFAULT_HEADERS["X-ArchivesSpace-Session"] = response.session;
          onSuccess(response);
        }
      });
    }
  },
  createExpedition: function(expedition, ){
    $.post({
      url: ARCHIVESPACE_URL + ARCHIVESPACE_PATHS.LOGIN,
      password: ARCHIVESPACE_PASSWORD,
      success: function(resp){
        var response = JSON.parse(resp);
        DEFAULT_HEADERS["X-ArchivesSpace-Session"] = response.session;
        onSuccess(response);
      }
    });
  }


}



jQuery(function(){
  FormSetup();
  var AS = ASSetup();
  var XEAC = XEACSetup();
});
