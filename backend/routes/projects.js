const router = require('express').Router();
const Project = require('../models/projects.model');

router.route('/').get((req, res) => {
    Project.find()
        .then(projects = res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/add').post((req, res) => {
    const {rname, rdescription, rstartDate, rendDate, rcoffeesAmount, rusername} = req.body;

    const name = rname;
    const description = rdescription;
    const startDate = Date.parse(rstartDate);
    const endDate = Date.parse(rendDate);
    const coffeesAmount = Number(rcoffeesAmount);
    const username = rusername;

    const newProject = new Project({
        name,
        description,
        startDate,
        endDate,
        coffeesAmount,
        username,
    })

    newProject.save()
        .then(() => {res.json('Project Added!')})
        .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;