//import BetterRequest from './BetterRequest';
const bees = require('./bees');

const xhr = new bees();
xhr.get('http://localhost:3000/api/canals', 
    {
        data: {
            lat: 52.2733348,
            lon: -1.4525503,
            latDelta: 0.002,
            lonDelta: 0.002,
        }
    }
)
.then(response => {
    console.log(response.json());
})
.catch(err => {
    console.log(err);
});

xhr

setTimeout(() => {
    xhr.abort();
}, 200);