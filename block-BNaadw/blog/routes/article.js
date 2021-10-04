var express = require("express");
var router = express.Router();
var Comment = require("../models/Comment");
var User = require("../models/User");
var Article = require("../models/Article");

router.get("/new" , (req, res , next)=>{
    res.render("articleForm")
})


router.post("/" , (req,res , next)=>{

    Article.create(req.body ,(err , article)=>{
        if(err) return next(err)
        res.redirect("/articles")
    })
})

router.get("/" , (req, res, next)=>{
    Article.find({} ,(err , article)=>{

if(err) return next(err);
res.render("allArticle" , {articles: article})

    })
})

router.get("/:slug" ,(req, res, next)=>{
    let slug = req.params.slug;
    Article.find({slug:slug}).populate("comments").populate("author").exec((err , article)=>{
        if(err)  return next(err);
        res.render("eachArticle" ,{articles:article})
    })
})

router.get("/:slug/edit" , (req, res , next)=>{
    let slug = req.params.slug;
    Article.findOne({slug} , (req, res , next)=>{
        if(err) return next(err)
        res.render("articleEdit" ,{articles:article})
    })
})

router.get("/:slug/likes" ,(req, res , next)=>{
    let slug = req.params.slug;
    Article.findByIdAndUpdate({slug:slug} ,{$inc:{likes:1}} , (err  , article)=>{
        if (err)return next(err);
        res.redirect("/articles" +slug)
    })
})

router.get("/:slug/dislikes" ,(req, res , next)=>{
    let slug = req.params.slug;
    Article.findByIdAndUpdate({slug:slug} ,{$inc:{likes:-1}} , (err  , article)=>{
        if (err)return next(err);
        res.redirect("/articles" +slug)
    })
})


router.post('/:slug', (req,res,next)=> {
    let slug = req.params.slug;
    Article.findOneAndUpdate({slug : slug},req.body, (err,article) => {
        if(err) return next(err);
        res.redirect('/articles/' + slug)
    })
})

router.get("/:slug/delete" , (req, res , next)=>{
    let slug = req.params.slug;
    Article.findByIdAndDelete({slug},(err , article)=>{
        if(err) return next(err);
        res.redirect("/articles")
    })
})


// update 

router.post("/:id/comment" ,(rer, res , next)=>{

    let id = req.params.id;
    req.body.articleId = id;
    req.body.author = req.session.userId;

    Comment.create(req.body , (err , comment)=>{
        if(err) return  next(err)
Article.findByIdAndUpdate(id, {$push:{comments:comment_id}} , (err, updateArticle)=>{
    if(err) return next(err);
    let slug = updateArticle.slug;
    res.redirect("/articles/slug")
})


    })
})

module.exports=router;