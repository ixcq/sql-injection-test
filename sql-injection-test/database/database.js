const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./database/vulnerable_app.db', (err) => {
    if (err) { console.log('Could not connect to database', err); }
    else { console.log('Connected to database'); }
});

module.exports = db;