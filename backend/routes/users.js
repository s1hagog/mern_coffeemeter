const router = require('express').Router();
const User = require('../models/users.model');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => console.log('Error finding user by id:' + err));
});

router.route('/add').post((req, res) => {
    const {username, password} = req.body;

    const newUser = new User({username, password});
    newUser.password = newUser.generateHash(password);

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;