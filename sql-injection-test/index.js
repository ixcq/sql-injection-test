const express = require('express');
const path = require('path');
const db = require('./database/database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const query = "SELECT * FROM products WHERE id = " + productId;
    db.get(query, (err, row) => {
        if (err) {
            return res.status(500).send('Internal server error\n\n' + err);
        }
        if (row) {
            res.render('product_detail', { product: row });
        } else {
            res.status(404).send('Product not found');
        }
    });
});

app.get('/products', (req, res) => {
    const query = "SELECT * FROM products";

    db.all(query, (err, rows) => {
        if (err) {
            return res.status(500).send('Internal server error\n\n' + err);
        }
        console.log('Fetched products:', rows);
        res.render('products', { products: rows });
    });
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT * FROM users WHERE username = '"+ username +"' AND password = '"+ password +"'";
    db.get(query, (err, row) => {
        if (err) {
            return res.status(500).send('Internal server error\n\n' + err);
        }
        if (row) {
            res.send('Giriş başarılı! Hoşgeldiniz, ' + row.username);
        } else {
            res.send('Kullanıcı adı veya şifre yanlış.');
        }   
    });
});
