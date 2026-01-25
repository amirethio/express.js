const allowedOrigins =  require('./allowedOrigins')

    
const corsOptions = {
    origin:(origin ,callback)=>{
        if(whiteList.indexOf(origin) !== -1  || !origin ){
            callback(null )
        }
    }
}