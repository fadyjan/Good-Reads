const express = require("express")
const mongoose = require('mongoose');
const multer = require("multer");

let router = express.Router()

let UserModel = require("../models/user")

const storage = multer.diskStorage({
   destination: function (req, file, callback) {
      callback(null, './public/user_imgs/');
   },
   filename: function (req, file, callback) {
      callback(null, new Date().toISOString() + file.originalname);
   }
});

const upload = multer({
   storage: storage
});


router.post('/', upload.single('userImage'), async function (req, res) {
    
    try {
        const newUser = new UserModel({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            img_path:req.file.path,
            email:req.body.email
        });
        const user = await newUser.save();
        res.status(201).json(user);
     } catch (error) {
        console.log(error);
        res.sendStatus(409);
     }

});


router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let results = await UserModel.findById(id).exec();
        res.json(results);
     } catch (error) {
        console.log(error);
        res.send(404, {
           error
        })
     }
  
});

router.delete('/:id', async(req, res) => {
    try {
        let id = req.params.id;
        let results = await UserModel.findByIdAndDelete(id).exec()
        res.json(results)
     } catch (error) {
        console.log(error);
        res.send(404, {
           error
        })
     }

})

router.patch('/:id',upload.single('coverImage') ,async(req, res) => {
    try {
        let id = req.params.id;
        console.log(req.body);
        
        let results = await UserModel.findByIdAndUpdate(id,req.body,{new:true}).exec()
        res.json(results)
     } catch (error) {
        console.log(error);
        res.send(404, {
           error
        })
     }
});

module.exports = router;