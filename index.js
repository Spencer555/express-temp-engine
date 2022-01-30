
const express = require('express')
const app = express()

//using handlebars
const exphbs = require('express-handlebars')
const members = require('./api/members')



// body parser middleware
//handle raw json
app.use(express.json())

//handle form submission
app.use(express.urlencoded({extended: false}))


//handlebars middleware
//add template engine
// setting the view engine our file called main
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//using handlebars to render a page and passing data to it 
app.get('/', (req, res) => res.render('index', {
    title:"Member APP",
    members
}))

//using handlebars to render a page and passing data to it 
app.get('/create', (req, res) => res.render('create', {
    title:"Member APP",
    members,
    
}))

//using handlebars to render a page and passing data to it 
app.get('/update/:id', (req, res) => res.render('update', {
    title:"Member APP",
    members,
    id:req.params.id
    
}))


// using handlebars to render a page and passing data to it 
app.get('/:id', (req, res) => res.render('detail', {
    title:"Member APP",
    members:members.filter((member) =>  member.id === parseInt(req.params.id))[0],
    error: members.filter((member) =>  member.id === parseInt(req.params.id))[0] == null ? 'Member Does Not Exist' : ""
    
}))


//using the router
app.use('/api/members', require('./api/router'))


const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`server running on port ${PORT}`))