const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();


// GET /things - - - - - - - Respond with all the things.
router.get('/', (req, res) => {
    console.log("in router.get before queryText")
    const queryText = `SELECT * FROM "creatures"
                        ORDER BY "id";`
    console.log("in router.get AFTER query Text")
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log("router.get is not working", error)
            res.sendStatus(500);
        })
})
//GET /things/:id - - - - - Respond with one thing.
// router.get('/:id', (req, res) => {
//     const queryText = `SELECT "name" FROM "creatures" WHERE "type" = $1;`

//     pool.query(queryText)
//     .then((result) => {
//         res.send(result.rows)
//     })
//     .catch((error) => {
//         res.sendStatus(500)
//     })
// })

// POST /things - - - - - -  Create one thing.
router.post('/', (req, res) => {

    const incomingCreature = [{
        name: req.body.name,
        type: req.body.type
    }];
    console.log("incoming creature", incomingCreature)


    //add new task to table on DOM
    const queryText =
        `INSERT INTO "creatures" ("name", "type")
        VALUES("$1", "$2");`

    //send queryText and queryParams to DB
    pool.query(queryText, incomingCreature)
    console.log("inside pool.query before then and catch")

        //then send created status
        .then((result) => {
            console.log("inside router.post .then")
            res.sendStatus(201)
        })
        .catch((error) => {
            console.log("Theres an error in router.post", error)
            res.sendStatus(500);
        })
})
// DELETE /things/:id - - -  Delete one thing.

// PUT /things/:id - - - - - Update one thing.


module.exports = router;
