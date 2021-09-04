const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const routesUrls=require('./routes/test')
const routescat=require('./routes/categories-route')
const routesuser=require('./routes/user-route')
const routesproject=require('./routes/project-route')
const routesnotif=require('./routes/notifications-route')
const routescart=require('./routes/carts-route')
const routesreward=require('./routes/rewards-route')
const routesaccount=require('./routes/accounts-route')
const routesadresse=require('./routes/adresses-route')
const routescont=require('./routes/contributions-route')
const routescom=require('./routes/commentaires-route')
const routesnote=require('./routes/notes-routes')
const routespost=require('./routes/posts-route')
const routesmb=require('./routes/membership-route')
const routesinv=require('./routes/investisseur-route')
const routescomu=require('./routes/communaute-route')
const routesconfirm=require('./routes/confirm-route')
const routesmesage=require('./routes/message-route')
const routespanier=require('./routes/panier-route')
const routesupdates=require('./routes/projectupdates-route')
const routesdetail=require('./routes/detailcontribution-route')


const mongoose = require("mongoose");

const db = require('./db')



/*mongoose
    .connect("mongodb://localhost:27017/crowdfunding",function () {
        console.log("database connected");});

app.get("/", function (req, res) {
    res.send("Salut");
});*/
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static('public'));
app.use(bodyParser.json())
app.use(cors())
/*app.use(function(req, res, next) {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });*/
app.use("/test",routesUrls);
app.use("/categorie",routescat);
app.use("/user",routesuser);
app.use("/project",routesproject);
app.use("/notif",routesnotif);
app.use("/cart",routescart);
app.use("/reward",routesreward);
app.use("/account",routesaccount);
app.use("/adresse",routesadresse);
app.use("/contribution",routescont);
app.use("/commentaire",routescom);
app.use("/note",routesnote);
app.use("/post",routespost);

app.use("/member",routesmb);
app.use("/investisseur",routesinv);
app.use("/commu",routescomu);
app.use("/confirm",routesconfirm);
app.use("/message",routesmesage);
app.use("/panier",routespanier);
app.use("/updates",routesupdates);
app.use("/detailcontribution",routesdetail);



app.listen(3000, function () {
    console.log("Server started");
});