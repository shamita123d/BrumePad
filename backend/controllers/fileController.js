const File = require('../models/File');

// Get all files
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

// Save a new file
exports.saveFile = async (req, res) => {
  try {
    const { name, content } = req.body;
    const file = new File({ name, content });
    await file.save();
    res.json({ message: 'File saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save file' });
  }
};

// 🗑️ Delete a file by ID
exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFile = await File.findByIdAndDelete(id);

    if (!deletedFile) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
