var uri = 'mongodb://localhost/myLRS';
mongoose.createConnection(uri, { server: { poolSize: 4 }});

// for a replica set
mongoose.createConnection(uri, { replset: { poolSize: 4 }});

// passing the option in the URI works with single or replica sets
var uri = 'mongodb://localhost/myLRS?poolSize=4';
mongoose.createConnection(uri);