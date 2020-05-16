module.exports = {
  apps: [
    {
      name: 'covalue-backend',
      script: './app.js',
      env: {
        'NODE_ENV': 'production',
        // 'MONGODB_URI': 'mongodb://root:example@mongo:27017',
        // 'MONGODB_URI': 'mongodb+srv://covalue:addingvalue@covalue-zxcf7.gcp.mongodb.net/test?retryWrites=true&w=majority',
        'MONGODB_URI': 'mongodb://covalue:addingvalue@localhost:27017',
        'PORT': '8080',
        'SECRET': 'secret'
      }
    },
  ],
};
