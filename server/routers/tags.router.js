const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
 

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "tags";`; 
    pool.query(queryText)
        .then((result) => { res.send(result.rows); console.log(result.rows);   })
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});

module.exports = router;