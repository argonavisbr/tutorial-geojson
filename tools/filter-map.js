const fs = require('fs');
const source = "../geo/ne_110m_admin_0_countries.json";
const target = "../geo/world.geojson";

fs.readFile(source, 'utf8', (err, json) => {
    if(err) throw err; 
    else process(JSON.parse(json));
});

function process(data) { // filter id (iso-a3) and name of country
    data.features.forEach(function(d) {
        d.id = d.properties.ISO_A3;
        const name = d.properties.NAME;
        d.properties = {name: name};
    });
    writeFile(JSON.stringify(data));
}

function writeFile(data) {
    fs.writeFile(target, data, (err) => {
        if(err) throw err;
        console.log('Done')
    });
}