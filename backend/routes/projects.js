const router = require('express').Router();
const Project = require('../models/projects.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects = res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    const cofeesAmount = Number(req.body.cofeesAmount);
    const username = req.body.username;

    const newProject = new Project({
        name,
        description,
        startDate,
        endDate,
        cofeesAmount,
        username,
    })

    newProject.save()
        .then(() => {res.json('Project Added!')})
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;