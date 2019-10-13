const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

let reqBody = {
    tags: ['laundry', 'shower', 'dinner']
}

// --------------------------------------------------//
// ------------GETTING SHELTERS BY TAGS--------------//
router.get('/:tags', (req, res) => {
    //turning tag params into an array
    const tagArray = req.params.tags.split(',');
    //-----------establishing query conditions based on tag
    let tagConditions = `WHERE `;
    for (let i=0; i<tagArray.length; i++){
        if (i === tagArray.length-1){
            tagConditions = `${tagConditions} "tag"='${tagArray[i]}'`
        } else {
            tagConditions = `${tagConditions} "tag"='${tagArray[i]}' OR `
        }
    }
    console.log('-------THESE ARE THE TAG CONDITIONS-------', tagConditions)
    //-----------query text for any call
    const queryText = `SELECT "shelter"."id", "name", "location", "phone", "website", "user_id",array_agg("tags".tag) AS "tags", array_agg("guest_type".type) AS "types", array_agg("hours") AS "hours"
        FROM "shelter"  JOIN "hours" on "shelter".id = "hours".shelter_id 
        JOIN "shelter_guest_count" on "shelter".id = "shelter_guest_count".shelter_id
        JOIN "shelter_tags" on "shelter".id = "shelter_tags".shelter_id
        JOIN "tags" on "tags".id = "shelter_tags".tag_id
        JOIN "guest_type" on "guest_type".id = "shelter_guest_count".type_id
        ${tagConditions} GROUP BY "shelter".id;`;
    //-------------querying database
    
    pool.query(queryText)
        .then((result) => { res.send(result.rows); console.log(result.rows); console.log(tagArray)})
        .catch((err) => {
            console.log('Error grabbing shelters by tag', err);
            res.sendStatus(500);
        });
});


module.exports = router;