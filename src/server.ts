import {Server} from 'http';
import app from './app';
import mongoose from 'mongoose';
let server:Server;
const PORT=5000;
async function main(){
    try{
await mongoose.connect('mongodb+srv://momo:Zal7PJcqbwMBrC4R@cluster0.ztncy8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
console.log('connected to mongo db');
server=app.listen(PORT,()=>{
console.log(`App is listening on port ${PORT}`);
});
    }
    catch(error){
        console.log(error);
    }
}
main();