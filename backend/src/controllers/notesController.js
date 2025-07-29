import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "Notes retrieved successfully", data: notes });
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNoteById(req, res) {
  try {
    const notes = await Note.findById(req.params.id);
    res
      .status(200)
      .json({ message: "Note retrieved successfully", data: notes });
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNotes(req, res) {
  try {
    const { title, content } = req.body;
    const createNote = new Note({ title, content });
    const savedNote = await createNote.save();
    res
      .status(201)
      .json({ message: "Notes created successfully", data: savedNote });
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNotes(req, res) {
  try {
    const { title, content } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );

    if (!updateNote) return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ message: "Notes updated successfully", data: updateNote });
  } catch (error) {
    console.error("Error in createNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNotes(req, res) {
  try {
    const { title, content } = req.body;
    const deleteNote = await Note.findByIdAndDelete(req.params.id);

    if (!deleteNote) return res.status(404).json({ message: "Note not found" });
    res
      .status(200)
      .json({ message: "Notes deleted successfully", data: deleteNote });
  } catch (error) {
    console.error("Error in deleteNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
