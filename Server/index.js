const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/Users');
const Post = require('./models/Posts');

const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const url =process.env.REACT_APP_DB_REG;

mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true},()=>{console.log("connected to the database")});

//get all posts 
app.get('/:id',async(req,res)=>{
    const user = await User.findById(req.params.id);
    const query = await Post.find({user:user._id});
    res.json(query);
})

//creating posts
app.post('/create',(req,res)=>{
    console.log(req.body);
    const post = new Post({
        title:req.body.title,
        description:req.body.description,
        image:req.body.image,
        user:req.body.user
    })
    post.save()
    .then((data)=>{console.log(data);res.status(200).json('success')})
    .catch(err=>{console.log(err)});
})


//login auth
app.post('/login',async(req,res)=>{
    const user = await User.find({ username:req.body.username, password:req.body.password});
    user?res.status(200).json(user):res.status(500);
})

//signup auth
app.post('/signup',(req,res)=>{
    const user = new User({
        username:req.body.username,
        password:req.body.password
    })

    user.save()
    .then((data)=>{console.log(data);res.status(200).json('success')})
    .catch(err=>{console.log(err)});
})

app.listen(3000,()=>{
    console.log("server running: True");
})
