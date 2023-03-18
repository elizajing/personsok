import { DOMParser } from 'xmldom';
const svar = `<?xml version='1.0' encoding='UTF-8'?>
<S:Envelope xmlns:S="http://schemas.xmlsoap.org/soap/envelope/">
    <S:Body>
        <ns25:SPARPersonsokningSvar xmlns="http://statenspersonadressregister.se/schema/komponent/metadata/identifieringsinformationWs-1.1" xmlns:ns2="http://statenspersonadressregister.se/schema/komponent/generellt/datumtid-1.1" xmlns:ns3="http://statenspersonadressregister.se/schema/komponent/person/adress/deladeadresselement-1.1" xmlns:ns4="http://statenspersonadressregister.se/schema/komponent/person/person-1.2" xmlns:ns5="http://statenspersonadressregister.se/schema/komponent/person/skyddadepersonuppgifter-1.1" xmlns:ns6="http://statenspersonadressregister.se/schema/komponent/person/inkomsttaxering-1.2" xmlns:ns7="http://statenspersonadressregister.se/schema/komponent/person/namn/deladenamnelement-1.0" xmlns:ns8="http://statenspersonadressregister.se/schema/komponent/person/namn/namn-1.0" xmlns:ns9="http://statenspersonadressregister.se/schema/komponent/person/avregistrering-1.0" xmlns:ns10="http://statenspersonadressregister.se/schema/komponent/person/persondetaljer-1.2" xmlns:ns11="http://statenspersonadressregister.se/schema/komponent/person/hanvisning-1.0" xmlns:ns12="http://statenspersonadressregister.se/schema/komponent/person/samordningsnummer-1.0" xmlns:ns13="http://statenspersonadressregister.se/schema/komponent/person/folkbokforing-1.0" xmlns:ns14="http://statenspersonadressregister.se/schema/komponent/person/adress/folkbokforingsadress-1.1" xmlns:ns15="http://statenspersonadressregister.se/schema/komponent/person/adress/sarskildpostadress-1.1" xmlns:ns16="http://statenspersonadressregister.se/schema/komponent/person/adress/utlandsadress-1.1" xmlns:ns17="http://statenspersonadressregister.se/schema/komponent/person/adress/kontaktadress-1.0" xmlns:ns18="http://statenspersonadressregister.se/schema/komponent/person/relation-1.2" xmlns:ns19="http://statenspersonadressregister.se/schema/komponent/person/fastighetstaxering-1.2" xmlns:ns20="http://statenspersonadressregister.se/schema/komponent/person/aviseringpost-1.2" xmlns:ns21="http://statenspersonadressregister.se/schema/komponent/sok/sokargument-1.2" xmlns:ns22="http://statenspersonadressregister.se/schema/komponent/sok/undantag-1.0" xmlns:ns23="http://statenspersonadressregister.se/schema/komponent/sok/personsokningsokparametrar-1.1" xmlns:ns24="http://statenspersonadressregister.se/schema/personsok/2021.1/personsokningfraga" xmlns:ns25="http://statenspersonadressregister.se/schema/personsok/2021.1/personsokningsvar">
            <ns23:PersonsokningFraga>
                <ns4:IdNummer>195704133106</ns4:IdNummer>
            </ns23:PersonsokningFraga>
            <ns25:PersonsokningSvarspost>
                <ns4:PersonId>
                    <ns4:IdNummer>195704133106</ns4:IdNummer>
                    <ns4:Typ>PERSONNUMMER</ns4:Typ>
                </ns4:PersonId>
                <ns5:Sekretessmarkering>NEJ</ns5:Sekretessmarkering>
                <ns5:SkyddadFolkbokforing>NEJ</ns5:SkyddadFolkbokforing>
                <ns4:SenasteAndringSPAR>2019-12-02</ns4:SenasteAndringSPAR>
                <ns8:Namn>
                    <ns2:DatumFrom>2019-12-02</ns2:DatumFrom>
                    <ns2:DatumTill>9999-12-31</ns2:DatumTill>
                    <ns7:Aviseringsnamn>Efternamn3542, Christina Birgitta</ns7:Aviseringsnamn>
                    <ns7:Fornamn>Christina Birgitta Ulrika</ns7:Fornamn>
                    <ns7:Tilltalsnamn>20</ns7:Tilltalsnamn>
                    <ns7:Mellannamn>Thomeaus</ns7:Mellannamn>
                    <ns7:Efternamn>Efternamn3542</ns7:Efternamn>
                </ns8:Namn>
                <ns10:Persondetaljer>
                    <ns2:DatumFrom>2019-12-02</ns2:DatumFrom>
                    <ns2:DatumTill>9999-12-31</ns2:DatumTill>
                    <ns5:Sekretessmarkering>NEJ</ns5:Sekretessmarkering>
                    <ns5:SkyddadFolkbokforing>NEJ</ns5:SkyddadFolkbokforing>
                    <ns10:Fodelsedatum>1957-04-13</ns10:Fodelsedatum>
                    <ns10:Kon>KVINNA</ns10:Kon>
                </ns10:Persondetaljer>
                <ns13:Folkbokforing>
                    <ns2:DatumFrom>2019-12-02</ns2:DatumFrom>
                    <ns2:DatumTill>9999-12-31</ns2:DatumTill>
                    <ns13:FolkbokfordLanKod>01</ns13:FolkbokfordLanKod>
                    <ns13:FolkbokfordKommunKod>80</ns13:FolkbokfordKommunKod>
                    <ns13:Hemvist>Skriven på adressen</ns13:Hemvist>
                    <ns13:Folkbokforingsdatum>2003-01-01</ns13:Folkbokforingsdatum>
                    <ns13:DistriktKod>215025</ns13:DistriktKod>
                </ns13:Folkbokforing>
                <ns13:Folkbokforing>
                    <ns2:DatumFrom>2010-02-02</ns2:DatumFrom>
                    <ns2:DatumTill>2019-12-02</ns2:DatumTill>
                    <ns13:FolkbokfordLanKod>01</ns13:FolkbokfordLanKod>
                    <ns13:FolkbokfordKommunKod>80</ns13:FolkbokfordKommunKod>
                    <ns13:Hemvist>Skriven på adressen</ns13:Hemvist>
                    <ns13:Folkbokforingsdatum>2003-01-01</ns13:Folkbokforingsdatum>
                </ns13:Folkbokforing>
                <ns14:Folkbokforingsadress>
                    <ns3:SvenskAdress>
                        <ns2:DatumFrom>2019-12-02</ns2:DatumFrom>
                        <ns2:DatumTill>9999-12-31</ns2:DatumTill>
                        <ns3:Utdelningsadress2>Gatan142 8</ns3:Utdelningsadress2>
                        <ns3:PostNr>11146</ns3:PostNr>
                        <ns3:Postort>STOCKHOLM</ns3:Postort>
                    </ns3:SvenskAdress>
                </ns14:Folkbokforingsadress>
            </ns25:PersonsokningSvarspost>
            <ns25:UUID>ddaef9b4-fde3-402f-9391-2cbc07a84895</ns25:UUID>
        </ns25:SPARPersonsokningSvar>
    </S:Body>
</S:Envelope>`;
function formatJSONResponse(svar:string){
  const parser = new DOMParser();
  const xmlDOM = parser.parseFromString(svar,"text/xml");
  const idNummer = xmlDOM.getElementsByTagName("ns4:IdNummer")[0].childNodes[0].nodeValue;
  const Sekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
  const SkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
  const SenasteAndringSPAR = xmlDOM.getElementsByTagName("ns4:SenasteAndringSPAR")[0].childNodes[0].nodeValue;
  const firstLevelNodes = xmlDOM.getElementsByTagName("ns25:PersonsokningSvarspost")[0].childNodes;
  let jsonStruct = {
    IdNummer: idNummer,
    Sekretessmarkering: Sekretessmarkering,
    SkyddadFolkbokforing: SkyddadFolkbokforing,
    SenasteAndringSPAR: SenasteAndringSPAR,
  };
  for (let i = 0; i < firstLevelNodes.length; i++) {
    let item = firstLevelNodes[i];
    // if(item.nodeName !== "#text"){
    //     console.log('---nodeName: ', item.nodeName)
    //     console.log('---nodeValue: ', item.nodeValue)
    //     console.log('---childNodes: ', item.childNodes.length)
    // }
    if(item.nodeName !== "#text"){
        let struct = {};
        for (let j = 0; j< item.childNodes.length; j++) {
            let jItem = item.childNodes[j];
            if(jItem.nodeName !== "#text"){
                // console.log('-------node name: ', jItem.nodeName);
                // console.log('-------node value: ', jItem.nodeValue);
                // console.log('-------childe nodes: ', jItem.childNodes.length)
                let subStruct = {}
                for(let p = 0; p < jItem.childNodes.length; p++){
                    let pItem = jItem.childNodes[p];
                    if(pItem.nodeName !== "#text") {
                        const nodeName = pItem.nodeName;
                        const nodeValue = pItem.childNodes[0].nodeValue;
                        
                        subStruct = {...subStruct, nodeName: nodeValue};

                        // console.log('----------node name: ', pItem.nodeName);
                        // console.log('----------node value: ', pItem.childNodes[0].nodeValue);
                    }
                }
                const name = jItem.nodeName;
                struct = {...struct, nodeName: subStruct};
                console.log('-------JSON: ', JSON.stringify(struct));
            }
        }
        // const firstlevelName = item.nodeName;
        // jsonStruct = {...jsonStruct, firstlevelName: struct}
    }
  }
  
  
  const NamnDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
  const NamnDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
  const NamnAviseringsnamn = xmlDOM.getElementsByTagName("ns7:Aviseringsnamn")[0]?.childNodes[0].nodeValue;
  const NamnFornamn = xmlDOM.getElementsByTagName("ns7:Fornamn")[0].childNodes[0].nodeValue;
  const NamnTilltalsnamn = xmlDOM.getElementsByTagName("ns7:Tilltalsnamn")[0]?.childNodes[0].nodeValue;
  const NamnMellannamn = xmlDOM.getElementsByTagName("ns7:Mellannamn")[0]?.childNodes[0].nodeValue;
  const NamnEfternamn = xmlDOM.getElementsByTagName("ns7:Efternamn")[0].childNodes[0].nodeValue;
  const PersondetaljerDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
  const PersondetaljerDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
  const PersondetaljerSekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
  const PersondetaljerSkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
  const PersondetaljerFodelsedatum = xmlDOM.getElementsByTagName("ns10:Fodelsedatum")[0].childNodes[0].nodeValue;
  const PersondetaljerKon = xmlDOM.getElementsByTagName("ns10:Kon")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsFolkbokfordLanKod = xmlDOM.getElementsByTagName("ns13:FolkbokfordLanKod")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsFolkbokfordKommunKod = xmlDOM.getElementsByTagName("ns13:FolkbokfordKommunKod")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsHemvist = xmlDOM.getElementsByTagName("ns13:Hemvist")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsFolkbokforingsdatum = xmlDOM.getElementsByTagName("ns13:Folkbokforingsdatum")[0]?.childNodes[0].nodeValue;
  const FolkBokforingnsDistriktKod = xmlDOM.getElementsByTagName("ns13:DistriktKod")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressUtdelningsadress2 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress2")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressPostNr = xmlDOM.getElementsByTagName("ns3:PostNr")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressPostort = xmlDOM.getElementsByTagName("ns3:Postort")[0]?.childNodes[0].nodeValue;
  const UtlandsadressUtdelningsadress1 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress1")[0]?.childNodes[0].nodeValue;
  const UtlandsadressUtdelningsadress2 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress2")[0]?.childNodes[0].nodeValue;
  
  const json = {
    IdNummer: idNummer,
    Sekretessmarkering,
    SkyddadFolkbokforing,
    SenasteAndringSPAR,
    Namn: {
      DatumFrom: NamnDatumFrom,
      DatumTill: NamnDatumTill,
      Aviseringsnamn: NamnAviseringsnamn,
      Fornamn: NamnFornamn,
      Tilltalsnamn: NamnTilltalsnamn,
      Mellannamn: NamnMellannamn,
      Efternamn: NamnEfternamn
    },
    PersonDetaljer: {
      DatumFrom: PersondetaljerDatumFrom,
      DatumTill: PersondetaljerDatumTill,
      Sekretessmarkering: PersondetaljerSekretessmarkering,
      SkyddadBokforing: PersondetaljerSkyddadFolkbokforing,
      Fodelsedatum: PersondetaljerFodelsedatum,
      Kon: PersondetaljerKon
    },
    Folkbokforing: {
      DatumFrom: FolkBokforingnsDatumFrom,
      DatumTill: FolkBokforingnsDatumTill,
      DistriktKod: FolkBokforingnsDistriktKod,
      Kommunkod: FolkBokforingnsFolkbokfordKommunKod,
      FolkbokfordLanKod: FolkBokforingnsFolkbokfordLanKod,
      Folkbokforingsdatum: FolkBokforingnsFolkbokforingsdatum,
      Hemvist: FolkBokforingnsHemvist,
    },
    Folkbokforingsadress: {
      DatumFrom: FolkbokforingsadressDatumFrom,
      DatumTill: FolkbokforingsadressDatumTill,
      Utdelningsadress2: FolkbokforingsadressUtdelningsadress2,
      PostNr: FolkbokforingsadressPostNr,
      PostOrt: FolkbokforingsadressPostort,
    },
    Utlandsadress: {
        Utdelningsadress1: UtlandsadressUtdelningsadress1,
        Utdelningsadress2: UtlandsadressUtdelningsadress2,
    }
  }
  return json;
}
export default formatJSONResponse;
