const bees = require('./dist/bees');

const url = 'https://services.arcgis.com/DknzyjEEie5tEW0u/arcgis/rest/services/CRT_Canals_Public/FeatureServer/1/query?where=1%3D1&outFields=*&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelEnvelopeIntersects&outSR=4326&f=json';
const data = {
    geometry: "-1.4505,52.2713,-1.4545,52.2753",
}   


bees.get(url, 
    {
        data
    }, request => { 
        xhr = request;
        //request.abort();
    }
)
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});