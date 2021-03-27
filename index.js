const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const PORT = 3000;

const app = express();

app.use(bodyParser.json());

app.use(routes);

//404 error
app.use(async (req, res, next) => {
    res.status(404);
    res.send("Not Found")
});

//other errors handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
        status: err.status || 500,
        message: err.message,
        }
    });
});


app.listen(PORT, async() => {
    console.log(`Server up on http://localhost:${PORT}`);

    // try {
    //     await sequelize.sync({ force: true });
    //     console.log('Database Synced!');
    //     // process.exit(0); // exit code 0 is normal
    //   } catch (err) {
    //     // this will show the error
    //     console.log('There was an error!', err);
    //   }
})
