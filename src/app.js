const express = require('express')
require('dotenv').config()

const db = require('./configuration/db')
const cookRoutes = require('./routes/cook')
const customerRoutes = require('./routes/customer')
const orderRoutes = require('./routes/order') 
const dishRoutes = require('./routes/dish')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./configuration/swagger');

const app = express()

const uri = process.env.DATABASE_URI
const port = process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/cook", cookRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/dish/", dishRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () => {
    console.log(`Server listening on port ${port}`); 
    db.connect(uri)
});

module.exports = app;