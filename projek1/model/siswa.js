const mongoose = require('mongoose');
const Siswa = mongoose.model('Siswa', {
  nama: {
    type: String,
  },
  ipa: {
    type: String,
  },
  ips: {
    type: String,
  },
});

// menambah 1 data

// const siswa1 = new Admin({
//   nama: 'aji',
//   ipa: '88',
//   ips: '87',
// });

//simpan ke collection
module.exports = Siswa;
