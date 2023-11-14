import app from './index.js';
import { connectToMongoose } from './src/config/mongooseCongig.js';
app.listen(8000, ()=>{
    connectToMongoose();
    console.log("Server is listening of port 8000")
})

