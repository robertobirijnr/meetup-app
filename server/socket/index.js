

module.exports = function(io){
    io.on('connection',function(socket){
        console.log('connection has  been established successfully')

        socket.on('meetup/subscribe', (meetupId)=>{
            socket.join(`meetup-${meetupId}`)
        })

        socket.on('meetup/unsubscribe',(meetupId)=>{
            socket.leave(`meetup-${meetupId}`);
        })

        socket.on('meetup/postSave', (post)=>{
            socket.to(`meetup-${post.meetup}`).emit('meetup/postPublished',post)
        })
      })
}