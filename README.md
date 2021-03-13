Solution by David Pomerenke

__Usage__

- Install [npm](https://www.npmjs.com/) 7.6 <= v < 8 and [nodejs](https://nodejs.org/en/) 14.5 <= v < 15.
- `npm install`
- `npm start`
- Set the `PORT` parameter like in `PORT=8080 npm start` to use a different port from `8000`.

# coding_challenge_21

[GovData.de](https://www.govdata.de/) ist das Datenportal für Deutschland. Bund, Länder und Kommunen können hier Daten ihrer Verwaltungen anbieten. Obwohl das “Open-Data-Gesetz” dazu verpflichtet, Daten bereit zu stellen, wurden bisher nur ca. 52.000 Datensätze geteilt. 

![](https://www.govdata.de/o/govdatastyle-theme/images/datavisuals/connectionmap.jpg)

## Aufgabe
Stelle in einem kleinen Dashboard übersichtlich dar, wie viele Datensätze jedes Bundesministerium auf GovData zur Verfügung gestellt hat. Es sollte schnell ersichtlich sein, welche Ministerien die meisten Daten zur Verfügung gestellt haben. Länder, Kommunen und weitere Einrichtungen können ignoriert werden. 

GovData stellt zwei Schnittstellen zur Verfügung. Nutze entweder die [CKAN-API](https://www.govdata.de/ckan/api/3) [(Doku)](https://docs.ckan.org/en/2.8/api/) oder die [SPARQL-API](https://www.govdata.de/web/guest/sparql-assistent), um diese Aufgabe zu lösen. In 'departments.json' findest Du alle Bundesministerien sowie deren nachgelagerte Behörden, die Daten auf GovData geteilt haben. 

Nutze einen nicht-proprietären Tech-Stack deiner Wahl und erkläre in einem Readme wie wir deine Lösung zum Laufen bringen. Bitte schicke Deine Lösung per Mail an [challenge@tech4germany.org](mailto:challenge@tech4germany.org). 

## Bewertung
Du solltest für diese Challenge nicht mehr als 1-2 Stunden benötigen. Es ist möglich, innerhalb einer Stunde die volle Punktzahl zu erreichen.
Wir wollen sehen, dass Du mit APIs umgehen kannst und ressourcenschonend mit ihnen bist. Du solltest Dich mit Deinen Tools wohlfühlen und in der Lage sein, sauberen Code zu schreiben. Wir erwarten, dass Du reflektieren und begründen kannst, wie Du vorgegangen bist. Das Design werden wir nicht bewerten. 

## Viel Spaß! 🚀
Wir freuen uns auf deine Einreichung!
