const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');
const HapiPino = require('hapi-pino');


const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: process.env.HOST || '0.0.0.0'
    });

    await server.register(Inert);

    await server.register({
        plugin: HapiPino,
        options: {
            logEvents: ['response', 'onPostStart']
        }
    });

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'dist'),
                index: true
            }
        },
        options: {
            security: {
                hsts: true,
                xframe: 'deny',
                xss: 'enabled',
                noOpen: true,
                noSniff: true,
                referrer: 'no-referrer'
            },
            cors: {
                origin: ['*']
            }
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
