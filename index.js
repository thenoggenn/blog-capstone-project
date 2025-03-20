import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var allPosts = [];

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: allPosts});
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});

// Edit or create a new form
app.get("/edit", (req, res) => {
    if (req.query.id) {
        res.render("edit.ejs", {post: allPosts[req.query.id]});
    }
    else {
        res.render("edit.ejs");
    }
});

// Submit changes to a post
app.post("/edit_post", (req, res) => {
    var id = req.query.id;
    allPosts[id].image = req.body['image-url'];
    allPosts[id].title = req.body['post-title'];
    allPosts[id].body = req.body['post-body'];
    res.redirect("/");
});

// Delete specified post
app.get("/delete_post", (req, res) => {
    allPosts.splice(req.query.id, 1);
    allPosts.forEach((post, idx) => {
        post.id = idx;
    });
    res.redirect("/")
});

// Post a new blog post
app.post("/create", (req, res) => {
    allPosts.push({
        id: allPosts.length,
        image: req.body['image-url'],
        title: req.body['post-title'],
        body: req.body['post-body'],
    });
    res.redirect("/");
})

app.get("/view", (req, res) => {
    var id = req.query.id;
    res.render("view.ejs", {post: allPosts[id]});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});