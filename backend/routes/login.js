const router = require('express').Router();
const User = require('../models/users.model');
const UserSession = require('../models/userSession.model');

router.route('/login').post((req, res) =>{
    const {username, password} = req.body;
    if(!username){
        return res.send({
            success: false,
            message: 'Username cannot be blank',
        })
    }
    if(!password){
        return res.send({
            success: false,
            message: 'Password cannot be blank',
        })
    }

    User.find({
        username
    }, (err, users) => {
        if(err){
            return res.send({
                success: false,
                message: 'Username is wrong',
            });
        }
        if(users.length > 1){
            return res.send({
                success: false,
                message: 'More than one user found',
            })
        }
        if(users.length == 0){
            return res.send({
                success: false, 
                message: 'Zero users found',
            })
        }
        const user = users[0];
        console.log(users.length);
        if(!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Wrong password'
            })
        }

        //Otherwise create user session
        const userId = user._id
        const newUserSession = new UserSession({userId});
        newUserSession.save()
            .then((doc) => {
                res.send({
                    success: true,
                    message: 'Session started',
                    token: doc._id
                });
            })
            .catch(err => res.status(400).json('Session didnt start: ' + err));
    })
});

router.route('/verify').get((req, res) => {
    const {query} = req;
    const {token} = query;

    UserSession.find({
        _id: token,
        isDeleted: false,
    }).then(sessions => {
        if(sessions.length == 0){
            res.json('Zero session token found');
        }
        if(sessions.length > 1){
            res.json('More than 1 session token found');
            //practically impossible
        }
        if(sessions.length == 1){
            res.json('All good');
        }

    }).catch(err => {
        res.json('Error: ' + err);
    });
});

router.route('/logout').get((req, res) => {
    const {token} = req.query;

    UserSession.findByIdAndRemove(token, {useFindAndModify: false})
        .then((sessions) => {
            if(sessions === null){
                res.json('Zero session token found');
            }else{
                res.json('Session Completely deleted');
            }
        }).catch(err => {
            res.json('Error: ' + err);
        });
});

module.exports = router;