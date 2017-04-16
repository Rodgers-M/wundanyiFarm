var Animal = require('../../app/models/animal');
var Health = require('../../app/models/health');
var User   = require('../../app/models/user');

module.exports = {
  index : function(req, res){
    Animal.find({owner : req.user.username}, function(error, animals){
       if(error) res.send(error);
       res.render('animals/index',{
           animals : animals,
           page   : 'viewanimals'
       });
     }).sort({"species" :1});
  },
  records : function(req, res){
    res.render('animals/records',{
      page :'animals'
    });
  },
  create : function(req,res){
    var animal = new Animal();

    animal.species  = req.body.species;
    animal.gender   = req.body.gender;
    animal.tagnum   = req.body.tagnum;
	  animal.date		  = req.body.date;
	  animal.owner    = req.user.username;


    Animal.findOne({'tagnum': animal.tagnum}, function(err, foundAnimal){
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
  },
	edit : function(req, res){

	Animal.findOne({'tagnum': req.params.tagnum}, function(err, foundAnimal){
		if (err) return next(err);
		res.render('animals/edit',{
			page	: 'animals',
			animal	: foundAnimal
		});
	});
	},
	update : function(req, res){
		var tagnumb = req.body.tagnum;
		console.log(tagnumb);
	Animal.findOne({'tagnum': tagnumb}, function(error, animal){
			res.json(animal);
		});
	},
  health : function(req, res){
    res.render('animals/health', {
      page : 'animals'
    });
  },
  healthcreate : function(req, res){

    var tagnum = req.body.tagnum;
    console.log(tagnum)
    Animal.findOne({'tagnum': tagnum},'_id', function(err, foundAnimal){
      if(err) return(err);
      if(!foundAnimal){
        req.flash('error', 'No animal with provided tag number found, please make sure the animal details exist in the system');
        res.redirect('/records');
      }
      else {
        var animalId = foundAnimal._id;
        console.log(animalId)
        var health = new Health();

        health.disease      = req.body.disease;
        health.diagnosedate = req.body.diagnosedate;
        health.totalcost    = req.body.cost;
        health.nextdose     = req.body.nextdose;
        health.animal       = animalId;
        health.createdby    = req.user.username;

        health.save(function(err,heath){
          if(err) return(err);
          req.flash('success', 'health record saved successfuly');
          console.log('saved record', health);
          res.redirect('/records');
        });
      }
    });

  },
  viewhealth : function(req, res){
    Health.find({createdby : req.user.username}).populate('animal').exec(
      function(err, records){
        if(err) return err;
     res.render('animals/health',{
       page : 'viewhealth',
      records : records
     });
      }
    );
    }
  }
