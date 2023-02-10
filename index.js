const express = require("express");
const app = express();
// this comes from the express 
const path = require("path");
const redditData = require("./data.json");

// Here is how we can serve static assets (css, js, images)
app.use(express.static(path.join(__dirname, "/public")));
// Now we have to connect it in the view ejs file

// Let's tell our app to use EJS
app.set("view engine", "ejs");

// Let's install EJS by npm install ejs, we don't need to require it because it was set in the app.set above

// With view engine set to ejs, Express is going to assume there is a dir called views. Let's create it 'mkdir views'
// Set the absolute path to the directory (best practise)
app.set("views", path.join(__dirname, "/views"))

// touch views/home.ejs
// Add some basic HTML in home.ejs

// Now we can render the html page in the response. We don't need to specify the folder because the default is 'views'
// and we don't need to use (although we can) the extension .ejs

// <%= inserts a value %>
// <% This just runs JS%>


app.get("/", (req, res) => {
    res.render("home")
})

// Let's try to generate a random number 
app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 100) + 1;
    // Now num will be available as rand in random
    // We couls also do {num: num} or simply {num}
    res.render("random.ejs", { rand: num });
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data })
    } else {
        res.render("notfound", { subreddit })
    }

})

app.get("/cats", (req, res) => {
    const cats = ["Blue", "Stephanie", "Chirlie", "Winston", "Meowzavr"]
    res.render("cats", { cats })
})


app.listen(3000, () => {
    console.log("Listening on PORT 3000")
}) 