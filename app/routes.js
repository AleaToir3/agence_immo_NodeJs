module.exports = (app) => {
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home.js');
        (new Home()).print(req, res);
    });
    app.get('/register', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).print(req, res);
    });

    app.post('/register', (req, res) => {
        let Register = require('../src/controllers/Register.js');
        (new Register()).process(req, res);
    });
    app.get('/connexion', (req, res) => {
        let Authenticated = require('../src/controllers/Authenticated.js');
        (new Authenticated()).print(req, res);
      });
      
    
};

