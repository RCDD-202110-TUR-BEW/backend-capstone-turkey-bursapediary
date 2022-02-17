
const Project = require("../models/project");
const mongoose = require("mongoose");



const createProject = async (req, res) => {
    try {
        const { comment, review, project, user } = req.body;

        const newProjects = new Project({
            "title": project.title,
            "description": project.description,
            "category": [],
            "donation": project.donation,
            "amount": project.amount,
            "collectedAmount": project.collectedAmount,
            "comments": [],
            "review": [],
            "owners":project.owners,
            "supporters": project.supporters,
            "user": mongoose.Types.ObjectId(user._id)
        });

        newProjects.category.push(...project.categories)
        newProjects.save();
        res.status(200).json("Project created successfully")
    } catch (err) {
        res.status(422).json("Could not create project");
    }
};


const updateProject = async (req, res) => {
    const { title, description, category, donation } = req.body;
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

            project.title = title,
            project.description = description,
            project.donation = donation,
            project.supporters = supporters
            project.collectedAmount = donations
        const newCategory = {
            category : project.category
        }
        const newDonation = {
            amount: donation.amount,
            userID: mongoose.Types.ObjectId(donation.userID),
            timestamp: mongoose.Types.Date(donation.timestamp)
        }
        project.donations.push(newDonation)
        project.categories.push(newCategory)
        await project.save();

        res.json({
            message: 'Project updated successfully',
        });
    } catch (error) {
        res.status(422).json({ message: 'Unable to update project' });
    }
};

const doneProject = async (req, res) => {
    const { donation, project } = req.body;
    try {
        const project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ message: 'Project not found' });

        if (donation.amount + project.collectedAmount <= project.amount) {
            project.isDone = false
            project.save()
            res.json({
                isDone:false,
            })
            res.status(404).json({message: 'This project did not reach the required donation amount yet'});

        } else {
            project.isDone = true
            project.save()
            res.json({
               isDone:true,
            })
            res.status(200).json({message: 'This project reached the required donation amount'});
        }


    } catch (error) {
        res.status(422).json({ message: 'Unable to update project' });
    }
    
};



const removeProject = async (req, res) => {
    
    try {
        const project = await Project.deleteOne({_id:req.params.id});

        if (!project) return res.status(404).json({ message: 'Project not found' });

        res.json({
            message: 'Project removed successfully',
        });
    } catch (error) {
        res.status(422).json({ message: 'Unable to remove project' });
    }
};



module.exports = {
    createProject,
    updateProject,
    doneProject,
    removeProject,

};
