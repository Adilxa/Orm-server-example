import { v4 as uuid } from "uuid";

const clients = {};
const messages = [];

const wsConnection = wss => {
  wss.on("connection", ws => {
    const id = uuid();
    clients[id] = ws;
    ws.send(JSON.stringify(messages));

    ws.on("message", rawMessage => {
      const { name, message } = JSON.parse(rawMessage);
      messages.push({ name, message });
      for (let id in clients) {
        clients[id].send(JSON.stringify([{ name, message }]));
      }
    });

    ws.on("close", () => {
      delete clients[id];
      console.log(`Client is closed ${id}`);
    });
  });
};

export default wsConnection;
