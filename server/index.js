const express = require('express');
const fetch = require('node-fetch');
const open = require('open');
const path = require('path');
const jsonData = require('../departments.json');

// Counts the datasets that are at least `minAge` years old, by institution.
const sparqlQuery = minAge => `
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dcat: <http://www.w3.org/ns/dcat#>
SELECT DISTINCT ?name (COUNT(?dataset) AS ?datasets)  WHERE {
  ?dataset a dcat:Dataset .
  ?dataset dct:publisher ?agent .
  ?agent foaf:name ?name .
  ?dataset dct:issued ?date .
  BIND(
    FLOOR(
      ABS(
        ((YEAR(NOW()) - YEAR(?date)) * 365) +
        ((MONTH(NOW()) - MONTH(?date)) * 30) +
        (DAY(NOW()) - DAY(?date))
      ) / 365
    ) AS ?age) .
  FILTER(?age >= ${minAge}) .
  FILTER(?name in  (${allInstitutions(jsonData)})) .
}
GROUP BY ?name
`;

// Extracts departments and subordinates from JSON, disregarding the hierarchy.
const allInstitutions = jsonData => {
    const departmentNames = jsonData.departments.map(a => a.name);
    const subordinateNames = jsonData.departments.flatMap(a => (a.subordinates || []).map(b => b.name))
    return [...departmentNames, ...subordinateNames].map(a => '"' + a + '"').join(',');
}

// Attributes the dataset counts to the relevant department, 
// taking into account the hierarchy of departments and subordinates.
const departmentCounts = sparqlData => {
    const countDict = Object.fromEntries(sparqlData.results.bindings
        .map(({ name, datasets }) => [name.value, parseInt(datasets.value)]));
    const sum = l => l.reduce((acc, el) => acc + (el || 0), 0);
    return jsonData.departments.map(a => [
        a.name,
        (countDict[a.name] || 0) + sum((a.subordinates || []).map(b => countDict[b.name]))
    ]);
}

// Wraps the call to the API.
const fetch_ = minAge => {
    return fetch('https://www.govdata.de/sparql?query=' + encodeURIComponent(sparqlQuery(minAge)), {
        method: 'GET',
        headers: { 'Accept': 'application/sparql-results+json' }
    }).then(apiResponse => apiResponse.json())
}

const server = express();

// Serves the data at http://localhost:8000/data, for example.
server.get('/data', (request, response) => {
    fetch_(4).then(data4 => fetch_(2).then(data2 => fetch_(0).then(data0 =>
        response.json([data4, data2, data0].map(departmentCounts))
    ))).catch(error => {
        console.warn(error);
        response.status(error.status || 500).send({ error: error.message });
    });
});

// Serves static files from the '/public' directory.
server.use(express.static(path.join(__dirname, '..', 'public')));

const port = process.env.PORT || 8000;
server.listen(port, () => {
    const url = `http://localhost:${port}/`
    console.log('Server running at ' + url);
    open(url);
});
