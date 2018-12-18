var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");
//app config
mongoose.connect("mongodb://localhost/blog_app");
app.set ("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());
//mongoose/model config
var blogSchema = mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created:  {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
// 	title:"Lorem Ipsom",
// 	image:"data:image/jpeg;base64,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",
// 	body: "Morbi vel vehicula arcu. In vel consequat odio, quis rhoncus arcu. Duis non consectetur quam. Vestibulum sodales lectus id nulla vulputate facilisis. Maecenas vel facilisis est. Nulla dapibus auctor lacus. Proin ac dui fringilla, posuere quam sed, lacinia elit. Curabitur eu justo orci. Duis lacinia pellentesque quam, eu feugiat mauris semper vitae. Vestibulum et vestibulum nisl. Integer egestas lacus at ante dapibus, id euismod elit interdum. Pellentesque velit diam, fringilla et tempus eget, viverra sed erat. Mauris vel tempus elit."
// }, function(err, newblog){
// 	if(!err){
// 		console.log(newblog);
// 	}
// })
app.get("/", function(req, res){
	res.redirect("/blogs");
})
//RESTFUL routes
//index
app.get("/blogs", function(req, res){
	Blog.find({}, function(err, allBlogs){
		if (err){
			console.log(err);
		} else {
			res.render("index", {allBlogs:allBlogs});
		}
	});
})
//New==shows us the form
app.get("/blogs/new", function(req,res){
	res.render("new");
})
//Create Post new blog
app.post("/blogs", function(req,res){
	req.body.body = req.sanitize(req.body.body);
	var title = req.body.title;
	var image = req.body.image;
	var body = req.body.body;
	var blog = {
		title: title,
		image: image,
		body: body
	};

	Blog.create(blog, function(err, newBlog){
		if (err){
			console.log(err);
		} 
		else{
			res.redirect("/blogs");
		}
	})
});
//show===shows one Blog
app.get("/blogs/:id", function(req, res){
	Blog.findById(req.params.id, function(err,blog){
		if (err) {
			console.log(err);
		} else{
			res.render("show", {blog: blog});
		}
	})
})
//Edit == shows a form to edit a post
app.get("/blogs/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if (err){
			console.log(err);
		} else {
			res.render("edit", {blog: blog})
		}
	});
	
})
//update 
app.put("/blogs/:id", function(req, res){
	var title = req.body.title;
	var image = req.body.image;
	var body = req.body.body;
	var blog = {
		title: title,
		image: image,
		body: body
	};
	Blog.findByIdAndUpdate(req.params.id, blog, function(err, updated){
		if (err) {
			console.log(err);
		} else {
			res.redirect("/blogs/"+req.params.id);
		}
	})
})
//Destroy=====Delete a Post
app.delete("/blogs/:id", function(req,res){
	
	Blog.findByIdAndRemove(req.params.id, function(err){
		if (err) {
			console.log(err);
		} else{
			res.redirect("/blogs");
		}
	})
});

app.listen(3000, function(){
	console.log("app is on");
})
