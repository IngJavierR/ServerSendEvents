const path = require('path');

module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'sse API',
        version: '1.0.0',
        description: 'Microservice sse API',
    },
    servers: [
        { url: 'http://localhost:9220' }
    ],
    apis: [path.join(__dirname, './src/**/**/*.ts')]
};
