module.exports = {
  apps: [
    {
      name: 'covalue',
      script: './app.js',
      env: {
        'NODE_ENV': 'production',
        'MONGODB_URI': 'mongodb+srv://covalue:addingvalue@covalue-zxcf7.gcp.mongodb.net/test?retryWrites=true&w=majority',
        'PORT': '8080',
        'SECRET': 'secret'
      }
    },
  ],
};
