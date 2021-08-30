import cookieParser from 'cookie-parser';
import express from 'express';
import methodOverride from 'method-override';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import bindRoutes from './routes.mjs';

const FRONTEND_URL = process.env.FRONTEND_URL || ['http://localhost:3000', 'http://localhost:3001'];

// Initialise Express instance
const app = express();
// Set CORS headers
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL,
}));
// Set the Express view engine to expect EJS templates
app.set('view engine', 'ejs');
// Bind cookie parser middleware to parse cookies in requests
app.use(cookieParser());
// Bind Express middleware to parse request bodies for POST requests
app.use(express.urlencoded({ extended: false }));
// Bind Express middleware to parse JSON request bodies
app.use(express.json());
// Bind method override middleware to parse PUT and DELETE requests sent as POST requests
app.use(methodOverride('_method'));
// Expose the files stored in the public folder
app.use(express.static('public'));

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;

// socket
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: FRONTEND_URL,
});

io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('order-accepted', (orderId, room) => {
    console.log('got sent orderId', orderId, 'from', room);
    // send message to every other socket excluding the one that sent the message
    // socket.broadcast.emit('recieve-accepted-order', orderId);
    // socket.to(room).emit('recieved-accepted-order', 'HELLO');
    socket.emit('recieved-accepted-order', `HELLO ${room}`);
  });
});

httpServer.listen(PORT);

// app.listen(PORT);
export default io;
