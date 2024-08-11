// const { Databases, Storage, Users , Client} = require('appwrite')
// import * as sdk from 'node-appwrite'
const sdk = require('node-appwrite')


const {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    USER_COLLECTION_ID,
    PUBLIC_BUCKET_ID: BUCKET_ID,
    PUBLIC_ENDPOINT: ENDPOINT
} = process.env

const client = new sdk.Client()
    .setEndpoint(process.env.PUBLIC_ENDPOINT)
    .setProject(process.env.PROJECT_ID)
    .setKey(process.env.API_KEY); // Use the API key from the environment variable

const databases = new sdk.Databases(client)
const storage = new sdk.Storage(client)
const users = new sdk.Users(client)


module.exports = {
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    USER_COLLECTION_ID,
    BUCKET_ID,
    ENDPOINT,
    databases,
    storage,
    users
}