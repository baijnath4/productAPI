
const http = require('http');
const url = require('url');
const express = require('express');
const exp = require('constants');
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const YAML = require('yamljs')
const productRouter = require("./routes/product")
const cors = require('cors');

const fs = require('fs');
const jsYaml = require('js-yaml');


// https://www.youtube.com/watch?v=EnMQm365t_s

// const PORT = process.env.PORT || 8000;

const options = {
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Product API",
            version:'1.0.0',
            description:'A simple express product API'
        },
        servers:[
            {
                url:"http://localhost:8000"
            }
        ],      
    },
    apis:["./routes/*.js"]
}


const specs = swaggerJSDoc(options)

const yamlData = jsYaml.dump(specs);

fs.writeFile('swagger.yaml', yamlData, (err) => {
  if (err) {
    console.error('Error writing YAML file:', err);
  } else {
    console.log('Swagger YAML file generated as "swagger.yaml".');
  }
});


const app = express()
app.use(cors());
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(specs))
app.use("/",productRouter)
app.use(express.json())
// Server 
// const server = http.createServer((req,res)=>{
//     const pathName = req.url;

//     if (pathName === '/' || pathName === '/overview'){
//         res.end('This is overview ');
//     }else if(pathName === '/product'){
//         res.end("This is product");
//     }else if(pathName === '/api'){
//         // res.writeHead(200,{'Content-type':'application/json'});
//         res.end(data);
//     }else{
//         res.writeHead(404,{
//             'content-type':'text/html',
//             'my-own-header':'hellow-world'
//         });
//         res.end('<h1>Page NOt found</h1>')

//     }
// });

app.listen(8000,'127.0.0.1',()=>{
    console.log('Server is running on port 8000')
})