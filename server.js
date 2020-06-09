const express = require('express');
const htmlRoutes = require('./routes/htmlroutes');
const apiRoutes = require('./routes/apiroutes');


const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);



app.listen(PORT, () => console.log(`localhost:${PORT}`))