const express = require('express')
const body_parser = require('body-parser')
const app = express()

app.use(body_parser.urlencoded({extended:true}))

app.set('view engine', 'ejs')

app.get('/', function(req, res){
    var today = new Date();

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    }
    
    var day = today.toLocaleDateString('en-us', options)
    app.use(express.static('public'))
    res.render('list', {TypeOfday: day, newItem: items })

})

var items = []

app.listen(3000, function(){
    console.log('Server is running on port 3000')
})

app.post('/', function(req, res){
    items.push(req.body.newItem)
    console.log(items)
    res.redirect('/')
})