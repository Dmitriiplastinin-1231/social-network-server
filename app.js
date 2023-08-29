const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


require('dotenv').config();

const usersRouter = require('./routes/users');
const profileRouter = require('./routes/profile');
const postRouter = require('./routes/post');
const messageRouter = require('./routes/message.js');

const app = express();

// const storageConfig = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null, "uploads");
//     },
//     filename: (req, file, cb) =>{
//         cb(null, file.originalname);
//     }
// });




const corsOptions ={
    origin:'http://localhost:3000',
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


// app.use(express.static(__dirname));
// app.use(multer({storage:storageConfig}).single("filedata"));
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/profile', profileRouter);
app.use('/post', postRouter)
app.use('/message', messageRouter)


module.exports = app;
