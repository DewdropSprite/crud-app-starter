const pg = require('pg'); 

const Pool = pg.Pool;

let databaseName = 'crud_cardio_one'


const pool = new Pool({
  database: databaseName, // 👈 CHANGE THIS!
  host: 'localhost',
  port: 5432,
});

pool.on('connect', () => {
  console.log('Postgresql connected!');
});

pool.on('error', (error) => {
  console.log('Error with postgres pool!', error)
});


module.exports = pool;
