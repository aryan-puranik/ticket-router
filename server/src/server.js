import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { connectDB } from './config/db.js';
import { initSockets } from './sockets/index.js';

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
initSockets(server);

await connectDB();
server.listen(PORT, () => console.log(`API listening on ${PORT}`));