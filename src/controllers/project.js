
const models = require("../models/project-models");
const user = models.user;
const projects = models.projects;
const mongoose = require("mongoose");




const createProject = async (req, res) => {
    try{
        const { username, password, email, project } = req.body;

        const userCheck = user.findOne(
            {
                "username": username,
                "email": email,
                "password": password
            });
        console.log(userCheck);
        const newProjects = new projects({
            "title": project.title,
            "image": project.image,
            "description": project.description,
            "category": project.category,
            "donation": project.donation,
            "user": mongoose.Types.ObjectId(userCheck._id)
        });

        newProjects.save();
    } catch(err) {
        console.log(err);
        res.status(422).json("could not create project");
    }
};


const updateProject = async(req, res) => {
    const { title, image, description, category, donation } = req.body;

    await projects.updateOne(
        {
            _id: req.params.id
        }, 
        {$set: {
            "title": title, 
            "image": image,
            "description": description,
            "category": category,
            "donation": donation,
        }});
};

const doneProject = async(req, res) => {
    const { donation, project } = req.body;

    await projects.updateOne(
        {
            _id: req.params.id
        }, 
        {$set: {
            "donation": donation,
            "project": isDone,
            
        }});
};



const removeProject = async(req, res) => {
    await projects.deleteOne(
        {
        _id: req.params.id
        });
};



module.exports = {
    createProject,
    updateProject,
    doneProject,
    removeProject,

};
