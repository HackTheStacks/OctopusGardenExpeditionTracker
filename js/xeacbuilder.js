
var  fakeRecordSequence = 6000001;

function newExpeditionXML(name, where, notes, creator){
  var now = new Date();
  var standardNow = now.format("Y-m-d");
  var textNow = now.format("j F Y");

  return "<?xml version='1.0' encoding='UTF-8'?>\
    <eac-cpf xmlns=\"urn:isbn:1-931666-33-4\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\
      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\
      xsi:schemaLocation=\"urn:isbn:1-931666-33-4 http://eac.staatsbibliothek-berlin.de/schema/cpf.xsd\">\
      <control>\
        <!-- record ids must be unique, can be generated sequentially from amnhc_6000001\
        data in brackets below come from the expedition tracker app -->\
        <recordId>amnhc_"+(fakeRecordSequence++)+"</recordId>\
        <maintenanceStatus>new</maintenanceStatus>\
        <maintenanceAgency>\
          <agencyCode>OCLC-YAM</agencyCode>\
          <agencyName>American Museum of Natural History</agencyName>\
        </maintenanceAgency>\
        <languageDeclaration>\
          <language languageCode=\"eng\">English</language>\
          <script scriptCode=\"Latn\">Latin</script>\
        </languageDeclaration>\
        <maintenanceHistory>\
          <maintenanceEvent>\
            <eventType>created</eventType>\
            <eventDateTime standardDateTime=\""+standardNow+"\">"+textNow+"</eventDateTime>\
            <agentType>machine</agentType>\
            <agent>[Expedition Tracker]</agent>\
            <eventDescription>[AMNH Hackathon demo.]</eventDescription>\
          </maintenanceEvent>\
        </maintenanceHistory>\
      </control>\
      <cpfDescription>\
        <identity>\
          <entityType>corporateBody</entityType>\
          <nameEntry>\
            <part>"+name+"</part>\
          </nameEntry>\
        </identity>\
        <description>\
          <existDates>\
            <date>"+standardNow+"</date>\
          </existDates>\
          <places>\
            <place>\
              <placeEntry>"+where+"</placeEntry>\
            </place>\
          </places>\
          <biogHist>\
            <p>"+notes+"</p>\
          </biogHist>\
        </description>\
        <relations>\
          <cpfRelation>\
            <relationEntry>"+creator+"</relationEntry>\
          </cpfRelation>\
          <resourceRelation>\
            <relationEntry>[Title of Field Resource]</relationEntry>\
          </resourceRelation>\
        </relations>\
      </cpfDescription>\
    </eac-cpf>";
}

function newExpedition(name, where, notes, creator){
  var xml = newExpeditionXML(name, where, notes, creator);
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
  pom.setAttribute('download', "xEAC-Expedition.xml");

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
   } else {
    pom.click();
   }
}


function newResearcher(name, expedition){
  var xml = newResearcherXML(name, expedition);
  var pom = document.createElement('a');
  pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
  pom.setAttribute('download', "xEAC-Person.xml");

  if (document.createEvent) {
    var event = document.createEvent('MouseEvents');
    event.initEvent('click', true, true);
    pom.dispatchEvent(event);
   } else {
    pom.click();
   }
}

function newResearcherXML(name, expedition){
  var now = new Date();
  var standardNow = now.format("Y-m-d");
  var textNow = now.format("j F Y");

  return "<?xml version='1.0' encoding='UTF-8'?>\
    <eac-cpf xmlns=\"urn:isbn:1-931666-33-4\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"\
      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"\
      xsi:schemaLocation=\"urn:isbn:1-931666-33-4 http://eac.staatsbibliothek-berlin.de/schema/cpf.xsd\">\
      <control>\
        <!-- record ids must be unique, can be generated sequentially from amnhp_6000001\
        data in brackets below come from the expedition tracker app -->\
        <recordId>amnhp_"+(fakeRecordSequence++)+"</recordId>\
        <maintenanceStatus>new</maintenanceStatus>\
        <maintenanceAgency>\
          <agencyCode>OCLC-YAM</agencyCode>\
          <agencyName>American Museum of Natural History</agencyName>\
        </maintenanceAgency>\
        <languageDeclaration>\
          <language languageCode=\"eng\">English</language>\
          <script scriptCode=\"Latn\">Latin</script>\
        </languageDeclaration>\
        <maintenanceHistory>\
          <maintenanceEvent>\
            <eventType>created</eventType>\
            <eventDateTime standardDateTime=\""+standardNow+"\">"+textNow+"</eventDateTime>\
            <agentType>machine</agentType>\
            <agent>[Expedition Tracker]</agent>\
            <eventDescription>AMNH Hackathon demo.</eventDescription>\
          </maintenanceEvent>\
        </maintenanceHistory>\
      </control>\
      <cpfDescription>\
        <identity>\
          <entityType>person</entityType>\
          <nameEntry>\
            <part>"+name+"</part>\
          </nameEntry>\
        </identity>\
        <description>\
          <biogHist>\
            <p></p>\
          </biogHist>\
        </description>\
        <relations>\
          <cpfRelation>\
            <relationEntry>"+expedition+"</relationEntry>\
          </cpfRelation>\
        </relations>\
      </cpfDescription>\
    </eac-cpf>";
}
