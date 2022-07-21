
const express=require('express')
const app=express()
const server=require('http').Server(app)
const io =require('socket.io')(server)

app.set('view engine','ejs')
app.use(express.static('public'))
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/images',express.static(__dirname + '/public/images'));

const {v4:uuidV4}=require('uuid')
app.get('/', (req,res)=>{
    res.redirect(`/${uuidV4()}`)

})
app.get('/:room', (req,res)=>{
    res.render('room',{roomId:req.params.room})
})

io.on('connection',socket=>{
    socket.on('join-room',(roomId,userId)=>{
        
        socket.join(roomId)
        socket.to(roomId).emit('user-connected',userId)

    
    })
})



server.listen(3000)