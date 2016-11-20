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
    login: function(onSuccess, onError){
      $.post({
        url: ARCHIVESPACE_URL + ARCHIVESPACE_PATHS.LOGIN,
        password: ARCHIVESPACE_PASSWORD,
        success: function(resp){
          var response = JSON.parse(resp);
          DEFAULT_HEADERS["X-ArchivesSpace-Session"] = response.session;
          onSuccess(response);
        }
      });
    },
    createExpedition: function(expedition, onSuccess){
      $.post({
        url: ARCHIVESPACE_URL + ARCHIVESPACE_PATHS.EXPEDITION,
        headers: DEFAULT_HEADERS,
        contentType: "application/json",
        data: JSON.stringify(expedition),
        success: function(resp){
          onSuccess(JSON.parse(resp));
        }
      });
    }
  }
}

var XEACSetup = function(){
  var XEAC_URL = "http://data.library.amnh.org:8082/";
  var XEAC_PATHS = {
    SEARCH: "orbeon/xeac/results/?q=${query}%20AND%20entityType_facet:%22person%22"
  }

  return {
    searchPeople: function(term, onSuccess){
      $.post({
        url: XEAC_URL + XEAC_PATHS.SEARCH.replace("${query}",term),
        user:
        contentType: "application/json",
        data: JSON.stringify(expedition),
        success: function(resp){
          var hiddenDiv = document.createElement("div");
          hiddenDiv.innerHTML = resp
          var h3s = hiddenDiv.getElementsByTagName("h3");
          var results = [];
          for( var ix=2; ix < h3s.length; ix++ ){
            var header = h3s[ix];
            results.push({
              name: header.innerText,
              id: header.getElementsByTagName("a")[0].href.substring(49)
            });
          }
          onSuccess(JSON.parse(resp));
        }
      });
    }
  }
}



jQuery(function(){
  FormSetup();
  var AS = ASSetup();
  var XEAC = XEACSetup();
});
