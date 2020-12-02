/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
require('dotenv').config();

// Express
const express = require('express')
const app = express()
const cors = require('cors');


// Static folder
app.use(cors())

// Body Parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Morgan
const morgan = require('morgan')
app.use(morgan('dev'))

// Connection
const connect = require('./server/connection.js');

// Models
const Model = require('./server/models');

// Routes
const Routes = require('./server/routes');

// Init models
Model.Characteristics(connect, app);
Model.Country(connect, app);
Model.Category(connect, app);
Model.Product(connect, app);

// Init routes
Routes.Category(connect, app);
Routes.Product(connect, app);

const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: 'vueshop',
        pass: "qwerty123456",
    }
});

app.post('/api/cart/order', (req, res) => {
    const params = req.body;
    let orderText = 'Your order summ <strong>$' + params.cart.reduce(
        (total, cur) => total + cur.price * cur.quantity,
        0
    ) + '</strong>:<br/><table><thead><tr><th>Name</th><th>Quantity</th><th>Price</th></tr></thead><tbody>'
    params.cart.map((item) => {
        orderText += '<tr><td>' + item.name
        orderText += '</td><td>' + item.quantity
        orderText += '</td><td>$' + (item.price * item.quantity) + '</td></tr>'
    })
    orderText += '</tbody></table>'
    orderText += `<div>Address: ${params.form.address}</div>`

    transporter.sendMail({
        from: 'ReactShop <vueshop@yandex.ru>',
        to: params.form.email,
        subject: 'ReactShop order',
        html: orderText,
    });
    return res.json({
        status: true,
        message: "Your order submitted!"
    });
});

app.listen(process.env.API_PORT || 1337, () => console.log(`server run on ${process.env.API_PORT} port`))