const amqp = require("amqplib/callback_api");
//creating connection
//http://localhost:15672/#/exchanges
amqp.connect("amqp://localhost", (connectError, connection) => {
  if (connectError) {
    throw connectError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw connectError;
    }
    // channel.ExchangeDeclare(
    //     exchange: "Victor exchange",    //name of exchange
    //     type: "direct",             //type (direct, fanout, headers, topic)
    //     durable: "false",           // Durability (if false - deleted when server reload)
    //     autoDelete: "false",
    //     arguments: null              //another exchange, if first route not work
    //     internal: "no",              // "yes" only for E2E
    // );
    const QUEUE = "victortest";
    channel.assertQueue(QUEUE);
    let options = {
      headers: { test: "test", test2: "test2", "x-match": "all" },
    };
    channel.sendToQueue(QUEUE, Buffer.from("hello from Victor"), options);
    console.log(`Message sended ${QUEUE}`);
  });
});
