const express = require("express");
const jwt = require("jsonwebtoken");
const { auth } = require("../middlewares/auth.middleware");
const { NoteModel } = require("../model/Note.model");
const notesRouter = express.Router();



notesRouter.get("/", async (req, res) => {
    try {
      const {authorId} = req.body
      
    const notes = await NoteModel.find({authorId: authorId})
    console.log(authorId)
    res.status(200).json({"notes":notes})
  } catch (error) {
    res.status(400).json({"err": error.message})
  }
});


notesRouter.post("/create", async(req, res)=> {
    try {
        
        const newNote = new NoteModel(req.body)
        await newNote.save()
        res.status(200).json({"msg": "New note has been created"})
        
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }

})

notesRouter.patch("/update/:noteId", async(req, res)=> {
    try {
        const {noteId} = req.params
        const {authorId} = req.body
        const note = await NoteModel.findOne({_id:noteId})
        if (note.authorId == authorId) {
            const update = req.body;
            await NoteModel.findByIdAndUpdate({_id: noteId}, update)
            res.status(200).json({"msg": "Note has been updated"})
        } else {
            res.status(200).json({"msg": "Sorry, you are not authorized to make changes in this file"})
        }
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})


notesRouter.delete("/delete/:noteId", async(req, res)=> {
    try {
        const {noteId} = req.params;
        const {authorId} = req.body
        const note = await NoteModel.findOne({_id:noteId})
        if (note.authorId == authorId) {
            await NoteModel.findOneAndDelete({_id:noteId})
            res.status(200).json({"msg": "Note has been deleted"})
        } else {
            res.status(200).json({"msg": "Sorry, you are not authorized to make changes in this file"})
        }
        
    } catch (error) {
        res.status(400).json({"err": error.message})
    }
})

module.exports = { notesRouter };
