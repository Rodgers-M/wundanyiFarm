var Animal = require('../../app/models/animal');

module.exports = {
  index : function(req, res){
    Animal.find({}, function(error, animals){
       if(error) res.send(error);
       res.render('animals/index',{
           animals : animals,
           page   : 'viewanimals'
       });
     });
  },
  records : function(req, res){
    res.render('animals/records',{
      page :'animals'
    });
  },
  health : function(req, res){
    res.render('animals/health', {
      page : 'animals'
    });
  },
  create : function(req,res){
    var animal = new Animal();

    animal.species  = req.body.species;
    animal.gender   = req.body.gender;
    animal.tagnum   = req.body.tagnum;

    Animal.findOne({tagnum: animal.tagnum}, function(err, foundAnimal){
      if (foundAnimal){
        req.flash('error', 'Animal already exists in records, please ensure to input correct tag number');
        return res.redirect('/records');
      } else{
        animal.save(function(err, animal){
          if (err) return next(err);
          req.flash('success', 'Animal record saved successfuly');
          res.redirect('/viewanimals');
          console.log("saved animal ", animal);
        });
      }
    });
  }
  }
