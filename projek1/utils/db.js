const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/gweh'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
// const Siswa = mongoose.model('Siswa', {
//   nama: {
//     type: String,
//   },
//   ipa: {
//     type: String,
//   },
//   ips: {
//     type: String,
//   },
// });

// // menambah 1 data

// const siswa1 = new Siswa({
//   nama: 'aji',
//   ipa: '88',
//   ips: '87',
// });
// siswa1.save().then((siswa) => console.log(siswa));

//simpan ke collection
