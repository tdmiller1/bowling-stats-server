var config = {
    db: {
        username: "mongoUsername",
        password: "mongoPassord",
        host: "mongoHost",
        name: "databaseName",
        port: "mongoPort"
    }
}
if (process.env.NODE_ENV != 'development'){
    config = {
        db:{
            username: process.env.mongoUsername,
            password: process.env.mongoPassord,
            host: process.env.mongoHost,
            name: process.env.databaseName,
            port: process.env.mongoPort
        }
    }
}

module.exports = config;