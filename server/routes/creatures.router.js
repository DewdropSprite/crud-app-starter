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
router.post('/', (req,res) => {
    const newCreature = req.body;

    const queryText = `INSERT INTO "creatures" ("name", "type")
    VALUES($1, $2);
    `;

    pool.query(queryText, [newCreature.name, newCreature.type])
    .then((result)=>{
        res.sendStatus(201);
    })
    .catch((error)=>{
        res.sendStatus(500);
    })

})
// DELETE /things/:id - - -  Delete one thing.
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    let queryText = `DELETE FROM "creatures" WHERE "id" = $1;`

    pool.query(queryText, [reqId])
    .then((result) => {
        res.sendStatus(200);
    })
    .catch((error)=> {
        res.sendStatus(500)
    })
})
// PUT /things/:id - - - - - Update one thing.

// router.put('/:id', (req, res) => {
//     let creatureId = req.params.id;

//     let queryText = '';
  
//     if (direction === 'up'){
//       // use rank-1, so it get's closer to the awesome rank of 1
//       sqlText = `UPDATE songs SET rank=rank-1 WHERE id=$1`;
//     } else if (direction == 'down'){
//       sqlText = `UPDATE songs SET rank=rank+1 WHERE id=$1`;
//     } else {
//       // If we don't get an expected direction, send back bad status
//       res.sendStatus(500);
//       return; // Do it now, don't run code below
//     }
  
//     pool.query(sqlText, [songId])
//       .then((dbResponse) => {
//         res.send(dbResponse.rows);
//       })
//       .catch((err) => {
//         console.log(err);
//         res.sendStatus(500);
//       });
//   });

module.exports = router;
