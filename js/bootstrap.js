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

  // person name
  var personTimeout = null;
  $("#expedition-person").on('keyup', function(ev){
    if( personTimeout ){
      clearTimeout(personTimeout);
    }
    personTimeout = setTimeout(function(){
      $("#expedition-person-autocomplete").empty();
      if( ev.target.value.length > 0 ){
        XEAC.searchPeople(ev.target.value, function(people){
          people.forEach(function(person){
            var item = $("<li>"+person.name+"</li>");
            (function(per){
              item.click(function(ev){
                $("#expedition-person").val(per.name);
                $("#expedition-person-id").val(per.id);
                $("#expedition-person-autocomplete").empty();
              });
            })(person);
            $("#expedition-person-autocomplete").append(item);
          });
        });
      }
    }, 300);
  });

  // location
  var locationTimeout = null;
  $("#expedition-location").on('keyup', function(ev){
    if( locationTimeout ){
      clearTimeout(locationTimeout);
    }
    locationTimeout = setTimeout(function(){
      $("#expedition-location-autocomplete").empty();
      if( ev.target.value.length > 0 ){
        XEAC.searchLocations(ev.target.value, function(locations){
          locations.forEach(function(location){
            var item = $("<li>"+location+"</li>");
            (function(loc){
              item.click(function(ev){
                $("#expedition-location").val(loc);
                $("#expedition-location-autocomplete").empty();
              });
            })(location);
            $("#expedition-location-autocomplete").append(item)
          });
        });
      }
    }, 300);
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


var asdf = document.getElementsByClassName("page");
var countries = [];
for( let ix in asdf ){
  var page = asdf[ix];
  if( ix > 8 && (ix%2 === 1) && page.innerText.indexOf("nation") !== -1 ){
    countries.push(page.getElementsByTagName("a")[0].innerText);
  }
}
JSON.stringify(countries)

var XEACSetup = function(){
  var XEAC_URL = "http://10.20.40.218:3000/";
  var XEAC_PATHS = {
    PEOPLE: "api/v1/people?name=${query}",
    EXPEDITIONS: "api/v1/expeditions?name=${query}"
  };
  var LOCATIONS = [
    "Algeria","Angola","Benin","Botswana","Bono","Buganda","Burkina Faso","Burundi","Cameroon","Cape Verde","Central African Republic","Chad","Comoros","Congo","Côte d'Ivoire","Dahomey","Democratic Republic of the Congo","Djibouti","D'mt","Egypt","Egypt","Equatorial Guinea","Eritrea","Ethiopia","Fulani Empire","Gabon","Gao","Ghana","Gonja Kingdom","Ghana empire","Guinea","Guinea-Bissau","Kaabu","Kanem-Borno","Kenya","Kazembe","Kilwa","Kong","Lesotho","Liberia","Libya","Lozi","Madagascar","Luba Empire","Malawi","Mali","Mali Empire","Lunda Empire","Mauritania","Mauritius","Mapungubwe","Matapa","Morocco","Mozambique","Namibia","Niger","Mossi","Nigeria","Ngoyo","Numidia","Parc National du W du Niger","Ptolemaic Kingdom","Rwanda","Punt","Sao Tome and Principe","Senegal","Rustamid imamate","Seychelles","Sierra Leone","Somalia","Songhai Empire","South Africa","South Sudan","Sudan","Swaziland","Tanzania","The Gambia","Togo","Tunisia","Uganda","Takrur","Zambia","Zimbabwe",
    "Achaemenid Empire","Afghanistan","Alashiya","Armenia","Assyria","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei Darussalam","Cambodia","China","China","Cyprus","Gandhara","Gaya","Georgia","Graeco-Bactrian Kingdom","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kingdom of Israel","Koguryŏ","Korea","Kuwait","Kyrgyzstan","Lao","Langkasuka","Lebanon","Malaysia","Maldives","Melayu","Mongolia","Myanmar","Nangnang","Nam Viet","Nepal","North Korea","Oman","Paekche","Pakistan","Pergamon","Philippines","Qatar","Russia","Saudi Arabia","Silla","Singapore","South Korea","Soviet Union","Sri Lanka","Syria","Sultanate of Sulu","Taiwan","Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates","Urartu","Uzbekistan","Viet Nam","Xiongnu Empire","Yemen",
    "Albania","Andorra","Austria","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Czech Republic","Denmark","Estonia","Etruria","Finland","Flanders","France","German Democratic Republic","Germany","Greece","Greece","Greece","Hanseatic League","Holy See","Hungary","Iceland","Ireland","Italy","Kingdom of Sicily","Kingdom of the Two Sicilies","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","Netherlands","Norway","Ostrogothic Kingdom","Poland","Portugal","Prussia","Romania","San Marino","Serbia","Serbia and Montenegro","Slovakia","Slovenia","Soviet Union","Spain","Sweden","Switzerland","The former Yugoslav Republic of Macedonia","Ukraine","United Kingdom","West Germany",
    "Antigua and Barbuda","Bahamas","Barbados","Belize","Canada","Costa Rica","Cuba","Dominica","Dominican Republic","El Salvador","Grenada","Guatemala","Haiti","Honduras","International Peace Garden","Jamaica","Mexico","Netherlands Antilles","Nicaragua","Panama","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Trinidad and Tobago","United States","Waterton-Glacier International Peace Park",
    "Australia","Federated States of Micronesia","Fiji","Kiribati","Marshall Islands","Nauru","New Zealand","Palau","Papua New Guinea","Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu",
    "Argentina","Bolivia","Brazil","Chile","Colombia","Ecuador","Guyana","Paraguay","Peru","Suriname","Uruguay","Venezuela"
  ];
  return {
    searchPeople: function(term, onSuccess){
      $.get({
        url: XEAC_URL + XEAC_PATHS.PEOPLE.replace("${query}",encodeURIComponent(term)),
        success: onSuccess
      });
    },
    searchExpeditions: function(term, onSuccess){
      $.get({
        url: XEAC_URL + XEAC_PATHS.EXPEDITIONS.replace("${query}",encodeURIComponent(term)),
        success: onSuccess
      });
    },
    searchLocations: function(term, onSuccess){
      var searchReg = new RegExp(term, "i");
      onSuccess( LOCATIONS.filter(function(location){
        return searchReg.test(location);
      }) );
    }
  }
}

jQuery(function(){
  var AS = ASSetup();
  var XEAC = XEACSetup();
  FormSetup(XEAC);
  PageSetup();
});
