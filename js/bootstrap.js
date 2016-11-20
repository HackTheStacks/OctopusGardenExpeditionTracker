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


var FormSetup = function(XEAC){
  $('select').chosen();
  $('form').on('submit', function(event){
    event.preventDefault();
    var data = $(this).serializeObject();
  });
  $("#expedition-name").on('change', function(ev){
    $("#expedition-name-autocomplete").empty();
    XEAC.searchPeople(ev.target.value, function(people){
      people.forEach(function(person){
        $("#expedition-name-autocomplete").append("<li>"+person.name+"</li>")
      });

    });
  });
}

var PageSetup = function(){
  $('button.add-your-expedition').on('click', function(){
    $("html, body").stop().animate({scrollTop: $('form').position().top}, '500', 'swing', function() {

    });
  })
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
  var XEAC_URL = "http://10.20.40.218:3000/";
  var XEAC_PATHS = {
    SEARCH: "api/v1/people?name=${query}"
  }
  return {
    searchPeople: function(term, onSuccess){
      $.get({
        url: XEAC_URL + XEAC_PATHS.SEARCH.replace("${query}",encodeURIComponent(term)),
        success: onSuccess
      });
    }
  }
}

jQuery(function(){
  var AS = ASSetup();
  var XEAC = XEACSetup();
  FormSetup(XEAC);
  PageSetup();
});
