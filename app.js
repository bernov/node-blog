const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI =
  'mongodb+srv://ninja-admin:test123@nodetuts.ovqim.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// register view engine
app.set('view engine', 'ejs');

// middelware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog...',
//     body: 'more about my blog',
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//   Blog.findById('5f4f7295f736392434d531f0')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// routes
app.get('/', (req, res) => {
  // res.send('<h1>Home Page</h1>');
  // const blogs = [
  //   {
  //     title: 'Youshi finds eggs',
  //     snippet: 'Lorem ipsum dolor sit amet consecutetur',
  //   },
  //   {
  //     title: 'Mario finds stars',
  //     snippet: 'Lorem ipsum dolor sit amet consecutetur',
  //   },
  //   {
  //     title: 'How to defeat bower',
  //     snippet: 'Lorem ipsum dolor sit amet consecutetur',
  //   },
  // ];
  // res.render('index', { title: 'Home', blogs });
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  // res.send('<h1>About US</h1>');
  res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
