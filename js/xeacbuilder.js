
var  fakeRecordSequence = 6000001;

function newExpeditionXML(name, where, notes, creator){
  var now = new Date();
  var standardNow = date_format(now,"Y-m-d");
  var textNow = date_format(now, "j F Y");

  return "<?xml version='1.0' encoding='UTF-8'?>
    <eac-cpf xmlns=\"urn:isbn:1-931666-33-4\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"
      xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"
      xsi:schemaLocation=\"urn:isbn:1-931666-33-4 http://eac.staatsbibliothek-berlin.de/schema/cpf.xsd\">
      <control>
        <!-- record ids must be unique, can be generated sequentially from amnhc_6000001
        data in brackets below come from the expedition tracker app -->
        <recordId>amnhc_"+(fakeRecordSequence++)+"</recordId>
        <maintenanceStatus>new</maintenanceStatus>
        <maintenanceAgency>
          <agencyCode>OCLC-YAM</agencyCode>
          <agencyName>American Museum of Natural History</agencyName>
        </maintenanceAgency>
        <languageDeclaration>
          <language languageCode=\"eng\">English</language>
          <script scriptCode=\"Latn\">Latin</script>
        </languageDeclaration>
        <maintenanceHistory>
          <maintenanceEvent>
            <eventType>created</eventType>
            <eventDateTime standardDateTime=\""+standardNow+"\">"+textNow+"</eventDateTime>
            <agentType>machine</agentType>
            <agent>[Expedition Tracker]</agent>
            <eventDescription>[AMNH Hackathon demo.]</eventDescription>
          </maintenanceEvent>
        </maintenanceHistory>
      </control>
      <cpfDescription>
        <identity>
          <entityType>corporateBody</entityType>
          <nameEntry>
            <part>"+name+"</part>
          </nameEntry>
        </identity>
        <description>
          <existDates>
            <date>"+standardNow+"</date>
          </existDates>
          <places>
            <place>
              <placeEntry>"+where+"</placeEntry>
            </place>
          </places>
          <biogHist>
            <p>"+notes+"</p>
          </biogHist>
        </description>
        <relations>
          <cpfRelation>
            <relationEntry>"+creator+"</relationEntry>
          </cpfRelation>
          <resourceRelation>
            <relationEntry>[Title of Field Resource]</relationEntry>
          </resourceRelation>
        </relations>
      </cpfDescription>
    </eac-cpf>\";
}

function newExpedition(name){
  var xml = newExpeditionXML()



}
