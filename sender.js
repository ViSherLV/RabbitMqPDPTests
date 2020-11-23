const amqp = require('amqplib/callback_api');
//creating connection
amqp.connect('amqp://localhost', (connectError, connection) => {
    if (connectError) {
        throw connectError
    }
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw connectError
        }
        const QUEUE = 'victortest'
        channel.assertQueue(QUEUE);
        channel.sendToQueue(QUEUE, Buffer.from('hello from Victor'));
        console.log(`Message sended ${QUEUE}`)
    })
});

