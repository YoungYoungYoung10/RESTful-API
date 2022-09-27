const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//1.引入mongoose包
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));
//2.把mongoose连接到接口(注意！最后一个参数要根据项目不同而变化，这里是blogDB)
mongoose.connect("mongodb://localhost:27017/wikiDB")

//3.定义数据结构
articleSchema = mongoose.Schema({
    title: String,
    content: String
})

//4.创建模型
Article = new mongoose.model('Article', articleSchema)


///////////////////////////Request Targeting all Articles////////////////////
app.route("/articles")
    .get(function (req, res) {
        //5.创建一个新实例
        const new_article = new Article({
            title: req.body.title,
            content: req.body.title
        })
        new_article.save(function (err) {
            if (!err) {
                res.send("successfully added a new article")
            } else {
                res.send(err);
            }
        })
    })
    .post(function (req, res) {
        //5.创建一个新实例
        const new_article = new Article({
            title: req.body.title,
            content: req.body.title
        })
        new_article.save(function (err) {
            if (!err) {
                res.send("successfully added a new article")
            } else {
                res.send(err);
            }
        })
    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("successfully deleted all articles")
            } else {
                req.send(err)
            }
        })
    });

///////////////////////////Request Targeting a specific Article//////////////
app.route("/articles/:articleTitle")
    .get(function(req,res){
        Article.findOne({title:req.params.articleTitle},function(err,foundArticle){
            if(foundArticle){
                res.send(foundArticle)
            }else{
                res.send("No Articles found!")
            }
        })
    })
    .delete(function (req, res) {
        Article.deleteOne(
            {title:req.params.articleTitle},
            function(err){
                if(!err){
                    res.send("successfully deleted the article!")
                }else{
                    res.send(err)
                }
            })
    })
    .patch(function (req, res) {
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set:req.body},
            function(err){
                if(!err){
                    res.send("successfully updated the article!")
                }
            })
    })
    .put(function (req, res) {
        Article.updateOne(
            { title: req.params.articleTitle },
            { title: req.body.title, content: req.body.content },
            function (err) {
                if (!err) {
                    res.send("successfully updated the article!")
                }
            })
    });






app.listen(3000, function () {
    console.log("server started on port 3000")
})