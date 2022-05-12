const Product = require('/ProjTN/src/model/product.js');
// var findPeopleByName = function(personName, done) {
//     Product.find({}, function (err, personFound) {
//       if (err) return console.log(err);
//       console.log(personFound)
//       done(null, personFound);
//     });
//   };
//   findPeopleByName()


class queryDB{
    async findProduct (){
         await Product.find({})
    }
}


const findAll = new queryDB().findProduct().exec()
console.log(findAll)