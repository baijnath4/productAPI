const express= require('express')
const fs = require('fs');
const router = express.Router()

console.log(__dirname)
// const data = fs.readFileSync(`${__dirname}./dev-data/data.json`,'utf-8')
const data = fs.readFileSync('./dev-data/data.json','utf-8')
const dataObject = JSON.parse(data);

/**
 *@swagger
 * tags:
 *  name: Product
 *  description: Product details
 *
 */


 /**
  * @swagger
  * /:
  *  get:
  *   summary: Server information
  *   tags: [Product]
  *   responses:
  *    200:
  *     description: Server inofrmation
  *     content:
  *     
  */
router.get('/',(req, res)=>{
    res.end('Hellow from product server')
})

/**
 * @swagger
 * /api:
 *  get:
 *   summary: Get the production information
 *   tags: [Product]
 *   responses:
 *    200:
 *     description: Product inofrmaiton
 *  
 */
router.get('/api',(req,res)=>{
    res.end(data)
})

module.exports = router;