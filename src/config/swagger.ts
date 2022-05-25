export const swaggerOptions = {
    info: {
        version: '1.0.0',
        title: 'Web3 Challenge',
        description: "API that uses Web3 library to interact with a smart contract deployed in the Ethereum blockchain",
    },
    baseDir: __dirname,
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/swagger/index.html',
    filesPattern: '../../dist/**/*.js',
    exposeSwaggerUI: true,
    servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        }
    ],
};
