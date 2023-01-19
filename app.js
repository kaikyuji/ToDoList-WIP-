const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.listen(3000, ()=>{console.log('Server is running on 3000')})

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use('/public', express.static('public'))


app.get('/', function(req, res){
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
            difGMT = '-' + difGMT
        }else if(difGMT < 0){
            difGMT = '+' + difGMT
        }else{
            difGMT = ' ' + difGMT
        }
        let datetime = today.toLocaleDateString('en-us', options)
        console.log(datetime)
    res.render('index', {newItemEJS:itemsTDL, Date: datetime, GMT: difGMT})
})
let itemsTDL = [] 

app.post('/', function(req, res){
    itemsTDL.push(req.body.newItemJS)
    res.redirect('/')
    // não pode usar o render aqui, pois os forms estão no método POST, ou seja, os dados serão enviados aos POST requests.
    // com isso, renderizando eles em todo post request, implica que estaremos na página onde os dados estão guardados
    // o que não é o que queremos, queremos um site sem nenhum dado guardado, apenas requisições POST que recebem os dados e fazem alguma
    // determinada ação com esses
})


