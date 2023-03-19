import { DOMParser } from 'xmldom';

export type Value =
    | string
    | number
    | boolean
    | { [x: string]: Value }
    | Value[];

export type JSONObject = { [x: string]: Value };


function formatJSONResponse(svar: string): JSONObject {
    const parser = new DOMParser();
    const xmlDOM = parser.parseFromString(svar, 'text/xml');
    const firstLevelNodes = xmlDOM.getElementsByTagName('ns25:PersonsokningSvarspost')[0].childNodes;

    const jsonStruct: JSONObject = {};
    for (let i = 0; i < firstLevelNodes.length; i++) {
        const item = firstLevelNodes[i];
        if (item.nodeName !== '#text') {
            let name = item.nodeName;
            const value = item.nodeValue;
            if (value !== null && name !== null) {
                name = splitNameByColon(name);
                jsonStruct[name] = value;
            }

            for (let j = 0; j < item.childNodes.length; j++) {
                const jItem = item.childNodes[j];
                if (jItem.nodeName !== '#text') {
                    let jName = jItem.nodeName;
                    const jValue = jItem.childNodes[0].nodeValue;
                    if (jValue !== null && jName !== null) {
                        jName = splitNameByColon(jName);
                        jsonStruct[jName] = jValue;
                    }

                    for (let p = 0; p < jItem.childNodes.length; p++) {
                        const pItem = jItem.childNodes[p];
                        if (pItem.nodeName !== '#text') {
                            let pName = pItem.nodeName;
                            const pValue = pItem.childNodes[0].nodeValue!;
                            pName = splitNameByColon(pName);
                            jsonStruct[pName] = pValue;
                        }

                    }
                }
            }
        }
    }

    return jsonStruct;
}

function splitNameByColon(name: string): string {
    if (name.includes(':')) {
        return name.split(':')[1];
    }

    return name
}

export default formatJSONResponse;
