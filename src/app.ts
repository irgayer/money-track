import express from 'express';
import path from 'path';
require('dotenv').config();

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const categoriesRouter = require('./routes/categories');
const banksRouter = require('./routes/banks');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/banks', banksRouter);
app.use('/categories', categoriesRouter);
app.use('/auth', authRouter);

app.listen(process.env.PORT, function() {
    console.log("server is on localhost:" + process.env.PORT);
});

export { app };
