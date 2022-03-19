const express = require('express');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

const { body, validationResult } = require('express-validator');

//setup method overide
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// mengatur db
require('./utils/db');
const Admin = require('./model/admin');
const Siswa = require('./model/siswa');
// seting ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'halaman home',
    layout: './layouts/main-layout',
  });
});
//halaman data siswa
app.get('/data', async (req, res) => {
  // Contact.find().then((contact)=>{
  //   res.send(contact)

  // })
  const siswas = await Siswa.find();
  res.render('data', {
    title: 'Data Mahaiswa',
    layout: './layouts/main-admin',
    siswas,
  });
});
app.get('/data-siswa', async (req, res) => {
  // Contact.find().then((contact)=>{
  //   res.send(contact)

  // })
  const siswas = await Siswa.find();
  res.render('data-siswa', {
    title: 'Data Mahaiswa',
    layout: './layouts/main-layout',
    siswas,
  });
});

//halaman tambah data
app.get('/data/add', (req, res) => {
  res.render('add-data', {
    title: 'Form Tambah Data Siswa',
    layout: './layouts/main-admin',
  });
});

app.get('/about', (req, res) => {
  res.sendFile('/about/about.html', { root: __dirname });
});
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'halaman logim',
    layout: './layouts/main-layout',
  });
});

app.post('/login', async (req, res) => {
  const admin = await Admin.findOne({ nama: req.body.nama, sandi: req.body.sandi });
  console.log({ nama: req.body.nama, sandi: req.body.sandi });
  if (!admin) {
    res.status(404);
    res.send('<h1>asd</h1>');
  } else {
    res.redirect('/data');
  }
});

app.post(
  '/data',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Siswa.findOne({ nama: value });
      if (duplikat) {
        throw new Error('Nama Siswa sudah digunakan');
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-data', {
        title: 'form  tambah data kontak ',
        layout: './layouts/main-admin',
        errors: errors.array(),
      });
    } else {
      Siswa.insertMany(req.body, (error, result) => {
        res.redirect('/data');
      });
    }
  }
);

//edit form kontak
app.get('/data/edit/:nama', async (req, res) => {
  const siswa = await Siswa.findOne({ nama: req.params.nama });

  res.render('edit-data', {
    title: 'Form ubah Data Kontak',
    layout: './layouts/main-admin',
    siswa,
  });
});

app.put(
  '/data',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Siswa.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('Nama Siswa sudah digunakan');
      }
      return true;
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-data', {
        title: 'form  ubah data kontak ',
        layout: './layouts/main-admin',
        errors: errors.array(),
        siswa: req.body,
      });
    } else {
      Siswa.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            ipa: req.body.ipa,
            ips: req.body.ips,
          },
        }
      ).then((result) => {
        res.redirect('/data');
      });
      //kirimkan flash massage
    }
  }
);
// hapus data
app.delete('/data', (req, res) => {
  Siswa.deleteOne({ nama: req.body.nama }).then((result) => {
    res.redirect('/data');
  });
});
app.listen(3000, () => {
  console.log(`mongo contact app | listening http://localhost:${port}`);
});
