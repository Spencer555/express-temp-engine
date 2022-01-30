const express = require('express')
const hbs = require('express-handlebars')

const app = express()


//u can use any name but u tell express that anyfile with .hbs is for handlebars 
// we also tell express to use the file called layout to be the main handlebars
//layout dir tells where we can find the layouts

//partials dir is options is used to store things like the header &footer
app.engine('hbs', hbs({extname:'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/view/layouts/', partialssDir: __dirname + '/view/partials/'}))

//set view engine to hbs
app.set('view engine', hbs)


// in handlebars {{}} means ignore html {{{}}} means include html used in the file 