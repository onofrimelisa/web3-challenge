const swaggerAutogen = require('swagger-autogen')()

const outputFile = './docs/swaggerDoc.json'
const endpointsFiles = ['./dist/routes/router.js']

swaggerAutogen(outputFile, endpointsFiles)