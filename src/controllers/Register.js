const RepoUser = require('../repository/User')
module.exports = class Home {
    
    print(req, response) {
        response.render('register');  
    }

    process(request, response) {
        let entity = {
            email : request.body.email || '',
            password : request.body.password || '', // devra être hashé
            civility : request.body.civility || '',
            firstname: request.body.firstname || '',
            lastname: request.body.lastname || '',
            phone: request.body.phone || ''
        };
 
        // (new RepoUser).add(entity);
        // res.redirect('/')
        let repo = new RepoUser();
        repo.emailExists(entity.email).then((result) => {
            // si l'email existe deja dans la bdd
            if(result === true) {
                response.render('register', { 
                    error : `Cette adresse email existe déjà`, 
                    form : entity 
                }); 
            } else {
                let bcrypt = require('bcryptjs');
                entity.password = bcrypt.hashSync(
                    entity.password, 
                    bcrypt.genSaltSync(10)
                );

                // sinon on tente de le créer
                repo.add(entity).then((user) => {
                    request.flash('notify', 'Votre compte a bien été créé.');
                    response.redirect('/');
                }, (err) => {
                    response.render('register', { 
                        error : `L'enregistrement en base de données a échoué`, 
                        form : entity 
                    }); 
                });         
            }
        });

    }
    

};

