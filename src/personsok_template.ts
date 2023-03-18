const personsok = (KundNrLeveransMottagare: string, KundNrSlutkund: string, UppdragId: string, SlutAnvandarId: string, IdNummer: string) => `<soapenv:Envelope
xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
xmlns:per="http://statenspersonadressregister.se/schema/personsok/2021.1/personsokningfraga"
xmlns:iden="http://statenspersonadressregister.se/schema/komponent/metadata/identifieringsinformationWs-1.1"
xmlns:per1="http://statenspersonadressregister.se/schema/komponent/sok/personsokningsokparametrar-1.1"
xmlns:per2="http://statenspersonadressregister.se/schema/komponent/person/person-1.2"
xmlns:sok="http://statenspersonadressregister.se/schema/komponent/sok/sokargument-1.2">
<soapenv:Header/>
<soapenv:Body>
<per:SPARPersonsokningFraga>
<iden:Identifieringsinformation>
<iden:KundNrLeveransMottagare>${KundNrLeveransMottagare}</iden:KundNrLeveransMottagare>
<iden:KundNrSlutkund>${KundNrSlutkund}</iden:KundNrSlutkund>
<iden:UppdragId>${UppdragId}</iden:UppdragId>
<iden:SlutAnvandarId>${SlutAnvandarId}</iden:SlutAnvandarId>
</iden:Identifieringsinformation>
<per1:PersonsokningFraga>
<per2:IdNummer>${IdNummer}</per2:IdNummer>
</per1:PersonsokningFraga>
</per:SPARPersonsokningFraga>
</soapenv:Body>
</soapenv:Envelope>`

export default personsok;
