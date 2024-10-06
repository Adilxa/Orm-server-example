import { v4 as uuid } from "uuid";

const clients = {};
const rooms = {};

const wsConnection = wss => {
  wss.on("connection", ws => {
    const id = uuid();
    clients[id] = ws;

    ws.on("message", rawMessage => {
      const { name, message, roomId } = JSON.parse(rawMessage);

      if (!rooms[roomId]) {
        rooms[roomId] = [];
      }
      rooms[roomId].push({ name, message });

      for (let clientId in clients) {
        clients[clientId].send(JSON.stringify({ name, message, roomId }));
      }
    });

    ws.on("close", () => {
      delete clients[id];
      console.log(`Client ${id} disconnected`);
    });
  });
};

export default wsConnection;
