const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path.js');

const adminRoutes = require('./routes/admin');
const homeRoutes = require('./routes/home');
const categoryRoutes = require('./routes/categoryRoutes');
const { error } = require('console');
const sequelize = require('./util/database.js');
const Product = require('./models/ProductModel');
const Category = require('./models/CategoryModel.js');
const User = require('./models/UserModel.js');
const Cart = require('./models/CartModel.js');
const CartItem = require('./models/CartItemModel.js');
const Order = require('./models/OrderModel.js');
const OrderItem = require('./models/OrderItemModel.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

//static files
app.use(express.static(path.join(rootDir, 'public')));
app.use('/css', express.static(path.join(rootDir, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
  User.findByPk(1)
  .then((user) => {
    req.user = user;
    next();
  });
});

//routes
app.use(homeRoutes);
app.use('/products', adminRoutes);
app.use('/users', adminRoutes);
app.use('/categories', categoryRoutes);

app.use((req, res ) =>{
    const viewdata = {
        pageTitle: 'Page not Found'
    };
    res.status(404).render('404', viewdata);
});

Category.hasMany(Product);
Category.belongsTo(User);

Product.belongsTo(Category);
Product.belongsTo(User);
Product.belongsToMany(Cart, { through: CartItem});
Product.belongsToMany(Order, {through: OrderItem});

User.hasMany(Category);
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});

Order.belongsTo(User);
Order.belongsToMany(Product, {through: OrderItem})

sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then((user) => {
    if(! user){
      User.create({name: 'Sahil', email: 'sahil@gmail.com'});
    }
  })
  .catch((error) => {
    console.log(error);
  });

Category.sync()
.then((result) => {
    //console.log(result);
})
.catch((error) => {
    console.log(error);
});


app.listen(3030, ()=> {
    console.log("server started at port 3030");
});