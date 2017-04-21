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

	var tagnum = req.body.tagnum;
    var trimmedtagnum = tagnum.trim();

	animal.species  = req.body.species;
    animal.gender   = req.body.gender;
    animal.tagnum   = trimmedtagnum;
    animal.date		= req.body.date;
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
		console.log(req.params.tagnum);
	Animal.findOne({'tagnum': req.params.tagnum}, function(err, foundAnimal){
		if (err) return next(err);
		res.render('animals/edit',{
			page	: 'animals',
			animal	: foundAnimal
		});
	});
	},
	update : function(req, res){
    var tagnum = req.body.tagnum;
    //rmove the white space at the end of tagnum before saving
    var trimmedtagnum = tagnum.trim();
		Animal.findOne({'tagnum' :req.body.tag}, function(error, foundAnimal){
		if(error) return next(error);
		if(req.body.species) foundAnimal.species = req.body.species;
		if(req.body.tagnum) foundAnimal.tagnum = trimmedtagnum;
		if(req.body.gender) foundAnimal.gender = req.body.gender;
		if(req.body.date) foundAnimal.date = req.body.date;
		foundAnimal.save(function(error){
			if(error) return next(error);
			req.flash('success','Animal record updated successfully');
			res.redirect('/viewanimals');
		});
		});
	},
	confirm : function(req, res){
		var tagnum	= req.params.tagnum;
		var species = req.params.species;
		res.render('animals/confirm',{
			page	: 'animals',
			tag		: tagnum,
			species : species
		});
	},
	delete : function(req, res){
		Animal.findOneAndRemove({'tagnum': req.body.tagnum},function(err, removedAnimal){
			if(err) return next(err);
      if(removedAnimal){
        Health.remove({'animal' : removedAnimal._id}, function(error, records){
          if(error) return next(error);
          req.flash('success', 'animal deleted successfully');
    			res.redirect('/viewanimals');
        });
      } else {
        req.flash('error', 'error, failed to delete animal, please try again');
        res.redirect('/viewanimals');
      }

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
