
const socket=io('/')



const mypeer=new Peer(undefined,{

    host:'/',
    port:'3001'

})
const videoGrid=document.getElementById('videoGrid')
const myVideo=document.getElementById('webcamVideo')
const RemoteVideo=document.getElementById('remoteVideo')
const webcamButton=document.getElementById('webcamButton')
let CameraState=0;
const MID=document.getElementById('meetinID')
let MIDT=MID.innerText;
const joinB=document.getElementById('answerButton')

myVideo.muted=true

joinB.onclick=function(){
   // alert('hi');
    let MIDT=MID.value;
    window.location.href = MIDT;

   // alert(MIDT);

};



navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{

    addVideoStream(myVideo,stream)
    
    mypeer.on('call', call=>{
        call.answer(stream)

        call.on('stream',userVideoStream=>{
            addVideoStream(RemoteVideo,userVideoStream)
        })
    })

    socket.on('user-connected',userId=>{
        ConnectToNewUser(userId,stream)
        setTimeout(ConnectToNewUser,1000,userId,stream)

    })
 




})




mypeer.on('open',id=>{
    socket.emit('join-room',RoomID,id)
})





function ConnectToNewUser(userId,stream){
    const call = mypeer.call(userId, stream)

    
    call.on('stream', userVideoStream => {

        addVideoStream(RemoteVideo, userVideoStream)
        
      })


    call.on('close',()=>{
        RemoteVideo.srcObject='https://images.drivereasy.com/wp-content/uploads/2018/09/VGA-no-signal-image.jpg'
    })



}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
      video.play()
    })
    videoGrid.append(video)
  }