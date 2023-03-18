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
      res.status(400).send('Invalid inputted format of person number');
      return;
    }

    const personNbr = validatedFormat[1];
    const validPersonNbr = validatePersonNbr(personNbr);

    if (!validPersonNbr) {
      res.status(400).send('Invalid person number');
      return;
    }

    // const personNbr = "195704133106";
    try{
      const svar = await personSok(input);
      const json = formatJSONResponse(svar);
      res.status(200).send(json);
    } catch(error) {
      res.status(400).send('Something went wrong fetching the data')
    }
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
      if (personNbr.length === 12) {
        personNbr = personNbr.slice(2);
      }
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
  let calculatedChecksum = 10 - lastDigit;
  console.log('---digit: ', lastDigit)
  if (calculatedChecksum >= 10){
    calculatedChecksum = Number(calculatedChecksum.toString().split("")[1]);
  }
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
    throw error;
  }
}

export default {validateFormat, validatePersonNbr};
