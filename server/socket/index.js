

module.exports = function(io){
    io.on('connection',function(socket){
        console.log('connection has  been established successfully')

        socket.on('meetup/postSave',function(post){
            io.emit('meetup/postPublished',post)
        })
      })
}