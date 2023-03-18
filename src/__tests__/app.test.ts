import request from 'supertest';
import {validateFormat, validatePersonNbr, app} from '../app';
import exampleSvar from '../TestData/JSONSvar';

describe('Person number validation tests', () => {
    test('should validate correct formats', () => {
        const format1 = '900116-6959';
        const format2 = '9001166959';
        const format3 = '199001166959';

        const res = validateFormat(format1);
        const res2 = validateFormat(format2);
        const res3 = validateFormat(format3);
        expect(res[0]).toEqual(true);
        expect(res2[0]).toEqual(true);
        expect(res3[0]).toEqual(true);
    });
    test('should validate incorrect formats', () => {
        const format1 = '900116-6959p';
        const format2 = '9001166959123';
        const format3 = '199001166-959';

        const res = validateFormat(format1);
        const res2 = validateFormat(format2);
        const res3 = validateFormat(format3);
        expect(res[0]).toEqual(false);
        expect(res2[0]).toEqual(false);
        expect(res3[0]).toEqual(false);
    });
    test('should validate correct person number',() => {
        const personNbr = '195704133106';
        const res = validateFormat(personNbr);
        const valid = validatePersonNbr(res[1]);

        expect(valid).toEqual(true);
    });
    test('should validate incorrect person number',() => {
        const personNbr = '195704133100';
        const res = validateFormat(personNbr);
        const valid = validatePersonNbr(res[1]);

        expect(valid).toEqual(false);
    });
  });

  describe('Server tests', () => {
    test('home route should show correct text', async () => {
        const text = 'Sök med personnummer';
        const res = await request(app).get('/');

        expect(res.text).toEqual(text);
        expect(res.status).toEqual(200);
    });
    test('input correct person number should return correct json', async () => {
        const personNbr = '195704133106';
        const res = await request(app).get(`/person?personnummer=${personNbr}`);
        const svar = JSON.parse(exampleSvar);
        const r = JSON.parse(res.text);

        expect(r).toEqual(svar);
    });
    test('input incorrect person number should return 400', async () => {
        const personNbr = '195704133100';
        const res = await request(app).get(`/person?personnummer=${personNbr}`);

        expect(res.text).toEqual('Invalid person number');
        expect(res.status).toEqual(400);
    });
    test('input incorrect person number format should return 400', async () => {
        const personNbr = '19570413-3100';
        const res = await request(app).get(`/person?personnummer=${personNbr}`);

        expect(res.text).toEqual('Invalid inputted format of person number');
        expect(res.status).toEqual(400);
    });
  })
