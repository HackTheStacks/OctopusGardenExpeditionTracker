// Main Stuffs

var Fetcher = {

  get: function(url, onSuccess, onError){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if( req.readyState === XMLHttpRequest.DONE ){
        if( req.status === 200 ){
          onSuccess(req.responseText);
        } else {
          onError( req.status, req.responseText);
        }
      }
    }
    req.open("GET", url);
    req.send();
  },

  post: function(url, user, password, onSuccess, onError){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
      if( req.readyState === XMLHttpRequest.DONE ){
        if( req.status === 200 ){
          onSuccess(req.responseText);
        } else {
          onError( req.status, req.responseText);
        }
      }
    }
    req.open("POST", url, true, user, password);
    req.send();
  },

}



function(){
  var ARCHIVESPACE_USERNAME = "jlee";
  var ARCHIVESPACE_PASSWORD = "hackathon";
  var ARCHIVESPACE_URL = "http://data.library.amnh.org:8081/";

  var ASLogin(onSuccess, onError){
    Fetcher.post(ARCHIVESPACE_URL + "users/"+ARCHIVESPACE_USERNAME+"/login", ARCHIVESPACE_USERNAME, ARCHIVESPACE_PASSWORD, function(resp){
      var response = JSON.parse(resp);
      localStorage.set("session",response.session);
      onSuccess(response);
    }, function(status, message){
      alert(message);
    });
  }







}();
