const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: '0.0.0.0'
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, 'dist'),
                index: true
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
