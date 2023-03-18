import { DOMParser } from 'xmldom';

function formatJSONResponse(svar:string){
  const parser = new DOMParser();
  const xmlDOM = parser.parseFromString(svar,"text/xml");
  const idNummer = xmlDOM.getElementsByTagName("ns4:IdNummer")[0].childNodes[0].nodeValue;
  const Sekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
  const SkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
  const SenasteAndringSPAR = xmlDOM.getElementsByTagName("ns4:SenasteAndringSPAR")[0].childNodes[0].nodeValue;
  const NamnDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
  const NamnDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
  const NamnAviseringsnamn = xmlDOM.getElementsByTagName("ns7:Aviseringsnamn")[0]?.childNodes[0].nodeValue;
  const NamnFornamn = xmlDOM.getElementsByTagName("ns7:Fornamn")[0].childNodes[0].nodeValue;
  const NamnTilltalsnamn = xmlDOM.getElementsByTagName("ns7:Tilltalsnamn")[0]?.childNodes[0].nodeValue;
  const NamnMellannamn = xmlDOM.getElementsByTagName("ns7:Mellannamn")[0]?.childNodes[0].nodeValue;
  const NamnEfternamn = xmlDOM.getElementsByTagName("ns7:Efternamn")[0]?.childNodes[0].nodeValue;
  const PersondetaljerDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0]?.childNodes[0].nodeValue;
  const PersondetaljerDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0]?.childNodes[0].nodeValue;
  const PersondetaljerSekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0]?.childNodes[0].nodeValue;
  const PersondetaljerSkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0]?.childNodes[0].nodeValue;
  const PersondetaljerFodelsedatum = xmlDOM.getElementsByTagName("ns10:Fodelsedatum")[0]?.childNodes[0].nodeValue;
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
  const Utdelningsadress1 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress1")[0]?.childNodes[0].nodeValue;
  const Utdelningsadress2 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress2")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressPostNr = xmlDOM.getElementsByTagName("ns3:PostNr")[0]?.childNodes[0].nodeValue;
  const FolkbokforingsadressPostort = xmlDOM.getElementsByTagName("ns3:Postort")[0]?.childNodes[0].nodeValue;
  // TODO checkf if there are more 'duplicated' element nodes
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
      Utdelningsadress1,
      Utdelningsadress2,
      PostNr: FolkbokforingsadressPostNr,
      PostOrt: FolkbokforingsadressPostort,
    }
  }
  return json;
}

function generateJSON(svar:string) {
    const parser = new DOMParser();
  const xmlDOM = parser.parseFromString(svar,"text/xml");
  const idNummer = xmlDOM.getElementsByTagName("ns4:IdNummer")[0].childNodes[0].nodeValue;
  const Sekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
  const SkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
  const SenasteAndringSPAR = xmlDOM.getElementsByTagName("ns4:SenasteAndringSPAR")[0].childNodes[0].nodeValue;
  const firstLevelNodes = xmlDOM.getElementsByTagName("ns25:PersonsokningSvarspost")[0].childNodes;
  const jsonStruct = {
    PersonData: [
    {IdNummer: idNummer},
    {Sekretessmarkering},
    {SkyddadFolkbokforing},
    {SenasteAndringSPAR},
    ]
  };
  for (let i = 0; i < firstLevelNodes.length; i++) {
    const item = firstLevelNodes[i];
    if(item.nodeName !== "#text"){
        console.log('---nodeName: ', item.nodeName)
        console.log('---nodeValue: ', item.childNodes[0].nodeValue)
        // console.log('---childNodes: ', item.childNodes.length)
    }
    if(item.nodeName !== "#text"){
        // let struct = {};
        for (let j = 0; j< item.childNodes.length; j++) {
            const jItem = item.childNodes[j];
            if(jItem.nodeName !== "#text"){
                console.log('-------node name: ', jItem.nodeName);
                console.log('-------node value: ', jItem.childNodes[0].nodeValue);
                // console.log('-------childe nodes: ', jItem.childNodes.length)
                // let subStruct = {}
                for(let p = 0; p < jItem.childNodes.length; p++){
                    const pItem = jItem.childNodes[p];
                    if(pItem.nodeName !== "#text") {
                        const nodeName = pItem.nodeName;
                        const nodeValue = pItem.childNodes[0].nodeValue!;

                        console.log('----------node name: ', pItem.nodeName);
                        console.log('----------node value: ', pItem.childNodes[0].nodeValue);
                    }

                }
                // const name = jItem.nodeName;
                // struct = {...struct, subStruct};
            }
        }
        // const firstlevelName = item.nodeName;
        // jsonStruct = {...jsonStruct, firstlevelName: struct}
    }
  }
}
export default formatJSONResponse;
