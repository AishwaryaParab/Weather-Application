const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, "..", "public");
console.log(publicDirectoryPath);
app.use(express.static(publicDirectoryPath));

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.set("view engine", "hbs");

// app.get('/', (req, res) => {
//     res.send('Hello Express');
// })

// app.get('/about', (req, res) => {
//     res.send({          //sending json, can also send array of objects
//         name: 'Aishwarya',
//         age: 22
//     });
// })

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Aishwarya Parab",
  });
});

// http://localhost:3000/products?search=games&rating=5
// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             error: 'Please enter a search term.'
//         })
//     }

//     res.send(req.query);
// })

app.get("/weather", (req, res) => {
  //handling query string
  if (!req.query.address) {
    return res.send({
      error: "Please enter an address term",
    });
  }

  geocode(req.query.address, (err, data) => {
    if(err) {
      return res.send({error: err});
    }
  
    const latitude = data.latitude;
    const longitude = data.longitude;
    const placeName = data.name;
  
    forecast(latitude, longitude, (error, data) => {
      if(error) {
        return res.send({error: error});
      }

      res.send({
        placeName: placeName,
        forecast: data
      })
    })  
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Aishwarya Parab",
  });
});

app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Aishwarya Parab",
    message: "Cannot find About article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Aishwarya Parab",
    message: "Cannot find your resource",
  });
});


const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${3000}.`);
});
