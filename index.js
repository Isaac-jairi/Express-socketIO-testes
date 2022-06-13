const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');

var messages = []
app.get('/', (req, res) => {
    res.render('index', {messages});
})

io.on('connection', (socket) => {
    socket.emit('messagesFromServer', messages);
    //console.log('a user connected');
    // socket.on('disconnect', () => {
    //   console.log('user disconnected');
    // });
    socket.on("messageFromClient", (data) => {
        messages.push(data);
        console.log(data);
    });
})

server.listen(3000, ()=>{
    console.log("online");
})