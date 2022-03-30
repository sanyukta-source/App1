const express = require('express');
const mongooose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/error');

const unless = require('express-unless');

const app = express();

mongooose.Promise = global.Promise;
mongooose.connect(dbConfig.db, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(
    () => {
        console.log('Database Connected');
    },
    (error) => {
        console.log('Database can not be connected');
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path : [
            {url : "/users/login", methods : ["POST"]},
            {url : "/users/register", methods : ["POST"]},
        ],
    })
);

app.use(express.json());

app.use("/users", require("./routes/user.routes"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, function(){
    console.log("Ready to go");
})