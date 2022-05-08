const express =require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser');
const pug = require('pug');
const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/tumor', {useNewUrlParser: true, useUnifiedTopology: true})
const port =80;
//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    text: String
  });


const contact = mongoose.model('contact', contactSchema);  
//express specific stuff
app.use('/static',express.static("static"))// for servng static files
app.use(express.urlencoded())

//pug specific stuff
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'))//set the views directory


//endpoints  //main basic points are above

app.get('/',(req,res)=>{
    const known ="the good idea";
    const params={'title':'brain mri segmantation',"content":known}
    res.status(200).render('home.pug',params);

})
app.get('/contact',(req,res)=>{
    const known ="the good idea";
    const params={'title':'brain mri segmantation',"content":known}
    res.status(200).render('contact.pug',params);

})

app.post('/contact',(req,res)=>{
    const params={}
    var mydata=new contact(req.body);
    mydata.save().then(()=>{
        res.send("the item has been saved");
    }).catch(()=>{
        res.send("the item has not been saved");
    })
    // res.status(200).render('contact.pug');

})


//start the server
app.listen(port,()=>{
    console.log(`the application has been start on port ${port}`);

});
