const router = require('express').Router();
const Project = require('../models/projects.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const {name, description, startDate, endDate, coffeesAmount, username} = req.body;

    const newProject = new Project({
        name,
        description,
        startDate: Date.parse(startDate),
        endDate: Date.parse(endDate),
        coffeesAmount: Number(coffeesAmount),
        username,
    });

    newProject.save()
        .then(() => {res.json('Project Added!')})
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/update').post((req, res) => {

}) 

router.route('/delete').delete((req, res) => {
    
})

module.exports = router;