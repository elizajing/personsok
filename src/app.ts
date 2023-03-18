import dotenv from "dotenv";
import express, { response } from "express";
import personsok_template from "./personsok_template";
import axios from "axios";
import https from "node:https";
import * as fs from "fs";
import * as path from "path";
import formatJSONResponse from "./formatJSONResponse";

// load the environment variables from the .env file
dotenv.config({
  path: ".env",
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
}

// initialize server app
const server = new Server();

// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
  server.app.listen(port, () => console.log(`> Listening on port ${port}`));
  server.app.get("/", (req, res) => {
    res.send("Sök med personnummer");
  });
  server.app.get('/person', async (req, res) => {
    const input = ''+req.query.personnummer;

    const validatedFormat = validateFormat(input);
    if (!validatedFormat[0]) {
      res.send('Invalid inputted format of person number');
      return;
    }

    const personNbr = validatedFormat[1];
    const validPersonNbr = validatePersonNbr(personNbr);

    if (!validPersonNbr) {
      res.send('Invalid person number');
      return;
    }

    // const personNbr = "195704133106";
    // const svar = await personSok(input);
    const json = formatJSONResponse(svar);

    res.send(json);
  });
})();

function validateFormat(input: string): [boolean, number[]] {
  // validate format
  // accepted formats: 900116-6959, 9001166959, 199001166959
  let personNbr: number[] = [];
  let splitted: string = input;
  if (input?.length === 11 || input?.length === 10 || input?.length === 12) {
    if (input[6] === "-") {
      splitted = input
        .split("-")
        .filter((i) => i)
        .join("");
    }
    const isNum = /^\d+$/.test(splitted);
    if (isNum) {
      personNbr = splitted.split("").map((i) => +i);
    } else {
      return [false, [0]];
    }
  } else {
    return [false, [0]];
  }

  return [true, personNbr];
}

function validatePersonNbr(personNbr: number[]): boolean {
  // check checksum of person number
  // 212121-212
  const checks: number[] = [];
  checks.push(personNbr[0] * 2);
  checks.push(personNbr[1] * 1);
  checks.push(personNbr[2] * 2);
  checks.push(personNbr[3] * 1);
  checks.push(personNbr[4] * 2);
  checks.push(personNbr[5] * 1);
  checks.push(personNbr[6] * 2);
  checks.push(personNbr[7] * 1);
  checks.push(personNbr[8] * 2);

  const newChecks = checks.map((n) => {
    if (n >= 10) {
      const tmp = n.toString().split("");
      const newN = +tmp[0].valueOf() + +tmp[1].valueOf();
      return newN;
    } else {
      return n;
    }
  });

  const sum = newChecks
    .reduce((acc, n) => Number(acc) + Number(n), 0)
    .toString()
    .split("");
  const lastDigit = +sum[sum.length - 1];
  const calculatedChecksum = 10 - lastDigit;
  const checkSum = personNbr[personNbr.length - 1];

  if (calculatedChecksum === checkSum) {
    return true;
  } else {
    return false;
  }
}

async function personSok(personNbr: string): Promise<string> {
  const KundNrLeveransMottagare = "500243";
  const KundNrSlutkund = "500243";
  const slutAnvandarId = "bolag-230312";
  const uppdragId = "637";
  const url = process.env.BASE_URL!;

  const body = personsok_template(
    KundNrLeveransMottagare,
    KundNrSlutkund,
    uppdragId,
    slutAnvandarId,
    personNbr
  );
  const keyPath = fs.readFileSync(path.join(__dirname, "../wsdl/bolag-a.key"));
  const certPath = fs.readFileSync(path.join(__dirname, "../wsdl/bolag-a.crt"));
  try {
    const agent = new https.Agent({
      key: keyPath,
      cert: certPath,
      rejectUnauthorized: false,
      keepAlive: true
    });

    const data = body;

    const axiosConfig = {
      httpsAgent: agent,
      headers: {
        "Content-Type": "text/xml",
       }
    };

    const response = await axios.post(url, data, axiosConfig).then(r => {
      return r.data
    })
    console.log('-----data: ', response);
    return response;
  } catch (error) {
    console.log(error);
    // TODO: handle when error is in response
    throw new Error("400");
  }
}

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
formatJSONResponse(svar);
// function formatJSONResponse(svar:string){
//   const parser = new DOMParser();
//   const xmlDOM = parser.parseFromString(svar,"text/xml");
//   const idNummer = xmlDOM.getElementsByTagName("ns4:IdNummer")[0].childNodes[0].nodeValue;
//   const nodes = xmlDOM.getElementsByTagName("ns4:IdNummer")[0].childNodes.
//   const Sekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
//   const SkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
//   const SenasteAndringSPAR = xmlDOM.getElementsByTagName("ns4:SenasteAndringSPAR")[0].childNodes[0].nodeValue;
//   const NamnDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
//   const NamnDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
//   const NamnAviseringsnamn = xmlDOM.getElementsByTagName("ns7:Aviseringsnamn")[0]?.childNodes[0].nodeValue;
//   const NamnFornamn = xmlDOM.getElementsByTagName("ns7:Fornamn")[0].childNodes[0].nodeValue;
//   const NamnTilltalsnamn = xmlDOM.getElementsByTagName("ns7:Tilltalsnamn")[0]?.childNodes[0].nodeValue;
//   const NamnMellannamn = xmlDOM.getElementsByTagName("ns7:Mellannamn")[0]?.childNodes[0].nodeValue;
//   const NamnEfternamn = xmlDOM.getElementsByTagName("ns7:Efternamn")[0].childNodes[0].nodeValue;
//   const PersondetaljerDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
//   const PersondetaljerDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
//   const PersondetaljerSekretessmarkering = xmlDOM.getElementsByTagName("ns5:Sekretessmarkering")[0].childNodes[0].nodeValue;
//   const PersondetaljerSkyddadFolkbokforing = xmlDOM.getElementsByTagName("ns5:SkyddadFolkbokforing")[0].childNodes[0].nodeValue;
//   const PersondetaljerFodelsedatum = xmlDOM.getElementsByTagName("ns10:Fodelsedatum")[0].childNodes[0].nodeValue;
//   const PersondetaljerKon = xmlDOM.getElementsByTagName("ns10:Kon")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsFolkbokfordLanKod = xmlDOM.getElementsByTagName("ns13:FolkbokfordLanKod")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsFolkbokfordKommunKod = xmlDOM.getElementsByTagName("ns13:FolkbokfordKommunKod")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsHemvist = xmlDOM.getElementsByTagName("ns13:Hemvist")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsFolkbokforingsdatum = xmlDOM.getElementsByTagName("ns13:Folkbokforingsdatum")[0].childNodes[0].nodeValue;
//   const FolkBokforingnsDistriktKod = xmlDOM.getElementsByTagName("ns13:DistriktKod")[0].childNodes[0].nodeValue;
//   const FolkbokforingsadressDatumFrom = xmlDOM.getElementsByTagName("ns2:DatumFrom")[0].childNodes[0].nodeValue;
//   const FolkbokforingsadressDatumTill = xmlDOM.getElementsByTagName("ns2:DatumTill")[0].childNodes[0].nodeValue;
//   const FolkbokforingsadressUtdelningsadress2 = xmlDOM.getElementsByTagName("ns3:Utdelningsadress2")[0].childNodes[0].nodeValue;
//   const FolkbokforingsadressPostNr= xmlDOM.getElementsByTagName("ns3:PostNr")[0].childNodes[0].nodeValue;
//   const FolkbokforingsadressPostort= xmlDOM.getElementsByTagName("ns3:Postort")[0].childNodes[0].nodeValue;

//   const json = {
//     IdNummer: idNummer,
//     Sekretessmarkering,
//     SkyddadFolkbokforing,
//     SenasteAndringSPAR,
//     Namn: {
//       DatumFrom: NamnDatumFrom,
//       DatumTill: NamnDatumTill,
//       Aviseringsnamn: NamnAviseringsnamn,
//       Fornamn: NamnFornamn,
//       Tilltalsnamn: NamnTilltalsnamn,
//       Mellannamn: NamnMellannamn,
//       Efternamn: NamnEfternamn
//     },
//     PersonDetaljer: {
//       DatumFrom: PersondetaljerDatumFrom,
//       DatumTill: PersondetaljerDatumTill,
//       Sekretessmarkering: PersondetaljerSekretessmarkering,
//       SkyddadBokforing: PersondetaljerSkyddadFolkbokforing,
//       Fodelsedatum: PersondetaljerFodelsedatum,
//       Kon: PersondetaljerKon
//     },
//     Folkbokforing: {
//       DatumFrom: FolkBokforingnsDatumFrom,
//       DatumTill: FolkBokforingnsDatumTill,
//       DistriktKod: FolkBokforingnsDistriktKod,
//       Kommunkod: FolkBokforingnsFolkbokfordKommunKod,
//       FolkbokfordLanKod: FolkBokforingnsFolkbokfordLanKod,
//       Folkbokforingsdatum: FolkBokforingnsFolkbokforingsdatum,
//       Hemvist: FolkBokforingnsHemvist,
//     },
//     Folkbokforingsadress: {
//       DatumFrom: FolkbokforingsadressDatumFrom,
//       DatumTill: FolkbokforingsadressDatumTill,
//       Utdelningsadress2: FolkbokforingsadressUtdelningsadress2,
//       PostNr: FolkbokforingsadressPostNr,
//       PostOrt: FolkbokforingsadressPostort,
//     }
//   }
//   return json;
// }
export default {validateFormat, validatePersonNbr};
