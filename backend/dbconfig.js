import {MongoClient } from "mongodb"

const url = "mongodb+srv://daniyalali047_db_user:Uu2ANRtMMHOgQHZc@cluster0.8v0topa.mongodb.net"
const dbName = "Node-project";
export const collectionName = "Todoapp";
const client = new MongoClient(url)
export const connection  = async ()=>{

const connect = await client.connect()
 return await connect.db(dbName)
}