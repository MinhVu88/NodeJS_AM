const path = require("path"),
  express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  hbs = require("hbs"),
  getLocation = require("./location"),
  getForecast = require("./forecast");

console.log(__dirname, "|", __filename);

// define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// set up static directory to serve
app.use(express.static(publicDirPath));

// set up handlebars engine, views & partials locations
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("", (req, res) => res.render("index", { content: "Home page", creator: "Johan Liebert" }));
app.get("/about", (req, res) => res.render("about", { content: "About page", creator: "Elliot Alderson" }));
app.get("/contact", (rq, res) => res.render("contact", { content: "Contact page", creator: "David Fincher" }));

// app.com
// app.get('', (request, response) => response.send('<h1>some html</h1>'));

// app.com/string
app.get("/string", (req, res) => res.send("some text/string"));

// app.com/json
app.get("/json", (req, res) => res.send({ name: "Paul D'Amour", birthplace: "Spokane, Washington", age: 53 }));

// app.com/array
app.get("/array", (req, res) =>
  res.send([
    { name: "Adam Jones", birthplace: "Park Ridge, Illinois", age: 55 },
    { name: "Maynard Keenan", birthplace: "Ravenna, Ohio", age: 56 },
    { name: "Dan Carey", birthplace: "Lawrence, Kansas", age: 59 },
    { name: "Justin Chancellor", birthplace: "London, England", age: 48 }
  ])
);

// app.com/products (Section 8: accessing API from browser)
app.get("/products", (request, response) => {
  if (!request.query.search) return response.send({ error: "A product must be specified" });

  console.log(request.query, "|", request.query.search, "|", request.query.rating);

  response.send({ products: [] });
});

// app.com/weather (Section 8: accessing API from browser)
app.get("/weather", (req, res) => {
  if (!req.query.location) return res.send({ error: "A location must be specified" });

  // {location, longitude, latitude} is set to a default parameter ({}), in case the callback (location.js) returns undefined
  // undefined can't be destructured & thus will cause the program to crash if such a value's returned
  getLocation(req.query.location, 1, (error, { location, longitude, latitude } = {}) => {
    if (error) return res.send({ error });

    getForecast(longitude, latitude, "f", (error, { weather, temperature_fahrenheit, feels_like, humidity }) => {
      if (error) return res.send({ error });

      res.send({ location, weather, temperature_fahrenheit, feels_like, humidity });
    });
  });
});

// set up 404 pages
app.get("/about/*", (req, res) => res.render("error", { content: "About data not found", creator: "Darlene Alderson" }));
app.get("*", (req, res) => res.render("error", { content: "Page not found", creator: "Angela Moss" }));

app.listen(port, () => console.log(`server is up on port ${port}`));
