module.exports = {
  apps: [
    {
      name: 'covalue',
      script: './app.js',
      env: {
        'NODE_ENV': 'production',
        'MONGODB_URI': 'mongodb://root:example@localhost:27017',
        'PORT': '8080',
        'SECRET': 'secret'
      }
    },
  ],
};
