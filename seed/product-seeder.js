var Product = require('/ProjTN/src/model/product.js');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/IPhone_6_op_tafel.jpg',
        title: 'Iphone 6',
        description: 'Awesome Game!!!!',
        price: 10
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/IPhone_6_op_tafel.jpg',
        title: 'Iphone 7',
        description: 'Also awesome? But of course it was better in vanilla ...',
        price: 20
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/IPhone_6_op_tafel.jpg',
        title: 'Iphone 8',
        description: 'Meh ... nah, it\'s okay I guess',
        price: 40
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/IPhone_6_op_tafel.jpg',
        title: 'Iphone 12',
        description: 'Now that is super awesome!',
        price: 15
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/IPhone_6_op_tafel.jpg',
        title: 'Iphone 11',
        description: 'I died!',
        price: 50
    })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}