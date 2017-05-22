//import BetterRequest from './BetterRequest';
const bees = require('./bees');

let xhr = null;

bees.get('http://localhost:3000/api/canals', 
    {
        data: {
            lat: 52.2733348,
            lon: -1.4525503,
            latDelta: 0.002,
            lonDelta: 0.002,
        }
    }, (request) => { 
        xhr = request; 
    }
)
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
});

/*setTimeout(() => {
    xhr.abort();
}, 200);*/