import express from 'express'
import ejs from 'ejs';
import ejsLint from 'ejs-lint'

const app = express();
const PORT = process.env.PORT || 3000;

let users = [];

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.use(express.static('/public/'));

app.post( '/users', (req,res) => {
    if (!req.body.field1 || !req.body.field2 || !req.body.field3) {
        res.status(400).send("invalid data");
    } else {
        users.push({
        id: users.length+1,    
        name: req.body.field1,
        email: req.body.field2,
        address: req.body.field3
    })
    
    res.redirect('/');
}})

app.post('/upd', (req, res) => {

    let a = (req.body.del) - 1;
    if (users[a]) {

    if (req.body.field1) {
        users[a].name = req.body.field1;
    }
    if (req.body.field2) {
        users[a].email = req.body.field2;
    }
    if (req.body.field3) {
        users[a].address = req.body.field3;
    }
    res.redirect('/');

    } else {
    res.send("user not found");
    }
});

app.delete('/del', (req, res) => {
    let a = (req.body.del) - 1;
    
    if (users[a]) {

        users[a] = {};
        users.length-=1
        res.redirect('/');
    
      } else {
        res.send("user not found");
      }
})

app.get( '/', (req,res) => {
    res.render( 'index', {user: users});
})


app.listen(PORT, console.log(`listening at http://localhost:${PORT}/users`));


// let a = (req.body.del) - 1;
// if (users[a]) {

//   if (req.body.name) {
//     users[a].name = req.body.name
//   }
//   if (req.body.email) {
//     users[a].email = req.body.email
//   }
//   if (req.body.address) {
//     users[a].address = req.body.address
//   }

//   res.redirect('/');

// } else {
//   res.send("user not found");
// }