const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.listen(3000, ()=>{console.log('Server is running on 3000')})

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

let everydayItems = [] 
let workItems = []
const allLists = [everydayItems, workItems]

//Datetime Code
let today = new Date();

let options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit'
}
let difGMT = today.getTimezoneOffset() / 60
if(difGMT > 0){
    difGMT = `GMT-${difGMT}`
}else if(difGMT < 0){
    difGMT = `GMT+${difGMT}`
}else if(difGMT == 0){
    difGMT = `GMT ${difGMT}`
}else{
    difGMT = 'SOMETHING WENT WRONG'
    console.log('error on dateTime')
}
let datetime = today.toLocaleDateString('en-us', options)



//GET & POST REQUESTS

app.get('/', function(req, res){
    res.render('index', {newItemEJS:everydayItems, myToDoList: 'Everyday stuff', listType: 'everyday', Date: datetime, GMT: difGMT })
})

app.post('/', function(req, res){
    if(req.body.listName == 'everyday'){
        if(req.body.newItemInput.trim().length >= 1){
            everydayItems.push(req.body.newItemInput)
            res.redirect('/')
        }else{
            console.log(`invalid new item (we dont accept only spaces answers)`)
            res.redirect('/')
        }
    }else if(req.body.listName == 'work'){
        if(req.body.newItemInput.trim().length >= 1){
            workItems.push(req.body.newItemInput)
            res.redirect('/work')
        }else{
            console.log(`invalid new item (we dont accept only spaces answers)`)
            res.redirect('/work')
        }
    }
    console.log(`listName: ${req.body.listName} |||||`,`workItems: ${workItems} |||||`, `everydayItems: ${everydayItems}`)
    // não pode usar o render aqui, pois os forms estão no método POST, ou seja, os dados serão enviados aos POST requests.
    // com isso, renderizando eles em todo post request, implica que estaremos na página onde os dados estão guardados
    // o que não é o que queremos, queremos um site sem nenhum dado guardado, apenas requisições POST que recebem os dados e fazem alguma
    // determinada ação com esses
})

app.post('/clear', function(req, res){
    everydayItems = []
    workItems = []
    res.redirect('/')
})

app.get('/work', function(req, res){
    res.render('index', {newItemEJS:workItems, myToDoList: 'Work List', Date:datetime, GMT:difGMT, listType: 'work'})
})

app.post('/work', function(req, res){
    workItems.push(req.body.newItemInput)
    res.redirect('/work')
})

