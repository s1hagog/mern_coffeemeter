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

router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error:' + err));
})

router.route('/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error:' + err));
})

router.route('/update/:id').post((req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            const {name, description, startDate, endDate, coffeesAmount, username} = req.body;
            project.name = name;
            project.description = description;
            project.startDate = Date.parse(startDate);
            project.endDate = Date.parse(endDate);
            project.coffeesAmount = Number(coffeesAmount);
            project.username = username;

            project.save()
                .then(() => res.json('Project Updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').patch((req, res) => {
    const id = req.params.id;
    const updateOps = {};

    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }

    Project.update({_id: id}, {$set: updateOps})
        .exec()
        .then(() => res.json('Project Custom fields Updated'))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;