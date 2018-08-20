const User = require('../models/user');
const Item = require('../models/item')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
    register: function (req, res) {
        User.findOne({ username: req.body.username })
            .then(function (dataUser) {
                if (dataUser) {
                    res.status(201).json({
                        message: 'username already exist'
                    })
                } else {
                    User.create({
                        username: req.body.username,
                        password: req.body.password
                    })
                        .then(function (dataCreated) {
                            res.status(201).json({
                                success: true,
                                message: ` Account ${dataCreated.username} registered `,
                            })
                        })
                        .catch(function (err) {
                            res.status(401).json({
                                message: err.message
                            })
                        })
                }
            })
            .catch(function (err) {
                res.status(401).json({
                    message: err.message
                })
            })
    },

    login: function (req, res) {
        User.findOne({
            username: req.body.username
        })
            .then(function (dataUser) {
                if (dataUser) {
                    let password = bcrypt.compareSync(req.body.password, dataUser.password)
                    if (password) {
                        let token = jwt.sign({ id: dataUser._id, username: dataUser.username }, 'secretkey')
                        res.status(200).json({
                            token: token
                        })
                    } else {
                        res.status(201).json({
                            message: 'Wrong password.'
                        })
                    }
                }else{
                    res.status(201).json({
                        message:'wrong username or password'
                    })
                }
            })
            .catch(function(err){
                res.status(500).json({
                    message:'User not found',
                    error:err
                })
            })
    },

    createItem: function(req,res){
        try {
            const token = req.headers.token
            let decoded = jwt.verify(token,'secretkey')
            let {name,price,stock,tags} = req.body
            Item.create({
                name:name,
                price:price,
                stock:stock,
                tags:tags,
                user:decoded.id
            })
            .then(function(newItem){
                res.status(201).json(newItem)
            })
            .catch(function(err){
                res.status(500).json({
                    err:err.message
                })
            })
        } catch (error) {
            res.status(400).json({
                error:"You are not authorized to access this API"
            })
        }
    },

    getItemBySearch: function(req,res){
        let queryName = {
            name: new RegExp(req.query.name,'i'),
            price: new RegExp(req.query.price,'i'),
            tags: new RegExp(req.query.tags,'i')
        }
        Item.find({
            $or:[queryName]
        })
        .then(function(item){
            res.status(201).json(item)
        })
        .catch(function(err){
            res.status(400).json(err.message)
        })
    },
}
