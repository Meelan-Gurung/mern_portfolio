const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log(`connection successful`);
}).catch((e) => console.log(`no connection`));