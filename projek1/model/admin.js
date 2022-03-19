const mongoose = require('mongoose');
const Admin = mongoose.model('Admin', {
  nama: {
    type: String,
  },
  sandi: {
    type: String,
  },
});

// menambah 1 data

// const admin1 = new Admin({
//   nama: 'admin',
//   sandi: 'admin',
// });

//simpan ke collection
module.exports = Admin;
