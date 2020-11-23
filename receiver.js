const amqp = require("amqplib/callback_api");
amqp.connect("amqp://localhost", (connectError, connection) => {
  if (connectError) {
    throw connectError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw connectError;
    }
    const QUEUE = "victortest";
    let options = {
      headers: { test: "test", test2: "test2", "x-match": "all" },
    };
    channel.assertQueue(QUEUE, options);

    channel.consume(QUEUE, (msg) => {
      console.log(`Message received: ${msg.content}`);
    });
  });
});
