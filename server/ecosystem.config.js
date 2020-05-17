module.exports = {
  apps: [
    {
      name: 'covalue-backend',
      script: './app.js',
      env: {
        'NODE_ENV': 'production',
        // 'MONGODB_URI': 'mongodb://root:example@mongo:27017', // server inside container
        'MONGODB_URI': 'mongodb://root:example@localhost:27017', // server outside container
        // 'MONGODB_URI': 'mongodb+srv://covalue:addingvalue@covalue-zxcf7.gcp.mongodb.net/test?retryWrites=true&w=majority',
        // 'MONGODB_URI': `mongodb://${process.env.HEROKU_MONGODB_USER}:${process.env.HEROKU_MONGODB_PSWD}@ds161860.mlab.com:61860/heroku_xx204trv`,
        'PORT': '8000',
        'SECRET': 'secret'
      }
    },
  ],
};
