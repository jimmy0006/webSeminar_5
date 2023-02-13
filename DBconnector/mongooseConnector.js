require("dotenv").config();

const connector = {
    mongoose : require('mongoose'),
    connect: function(){
        console.log(process.env.MONGODB_LINK)
        this.mongoose.connect(process.env.MONGODB_LINK).then(()=>{
            console.log('connect mongoDB')
        })
    },
    disconnect: function(){
        this.mongoose.disconnect().then(()=>{
            console.log('disconnect successfully!')
        })
    },
}

module.exports = connector