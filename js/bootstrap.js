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


var  FormSetup = function(){
  $('form').on('submit', function(event){
    event.preventDefault();
    var data = $(this).serializeObject();
  });
}


var APISetup = function(){
  var ARCHIVESPACE_USERNAME = "jlee";
  var ARCHIVESPACE_PASSWORD = "hackathon";
  var ARCHIVESPACE_URL = "http://data.library.amnh.org:8081/";

  return {
    ASLogin: function(onSuccess, onError){
      $.post({
        url: ARCHIVESPACE_URL + "users/"+ARCHIVESPACE_USERNAME+"/login",
        password: ARCHIVESPACE_PASSWORD,
        success: function(resp){
          var response = JSON.parse(resp);
          localStorage.set("session",response.session);
          onSuccess(response);
        }
      });
    }
  }

}



jQuery(function(){
  FormSetup();
  var API = APISetup();
});
