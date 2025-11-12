const fs = require('fs');
const path = require('path');
const os = require('os'); // For temp files
const File = require('../models/File');

// Execute code
exports.runCode = async (req, res) => {
    const { language, code } = req.body;

    if (!language || !code)
        return res.status(400).json({ error: 'Language and code are required' });

    const fileName = `temp_${Date.now()}`;
    let filePath, command;

    try {
        if (language === 'javascript') {
            filePath = path.join(os.tmpdir(), `${fileName}.js`);
            fs.writeFileSync(filePath, code);
            command = `node "${filePath}"`;

        } else if (language === 'python') {
            filePath = path.join(os.tmpdir(), `${fileName}.py`);
            fs.writeFileSync(filePath, code);
            command = `python3 "${filePath}"`;

        } else if (language === 'java') {
            // Extract public class name
            const classMatch = code.match(/public\s+class\s+(\w+)/);
            if (!classMatch)
                return res.status(400).json({ error: 'Java code must have a public class' });

            const className = classMatch[1];
            filePath = path.join(os.tmpdir(), `${className}.java`);
            fs.writeFileSync(filePath, code);

            const compileCmd = `javac "${filePath}"`;
            const runCmd = `java -cp "${os.tmpdir()}" ${className}`;

            return require('child_process').exec(compileCmd, { timeout: 5000 }, (compileErr, _, stderr) => {
                if (compileErr) {
                    try { fs.unlinkSync(filePath); } catch {}
                    return res.json({ output: stderr || compileErr.message });
                }

                require('child_process').exec(runCmd, { timeout: 5000 }, (runErr, stdout, runStderr) => {
                    // Cleanup
                    try { fs.unlinkSync(filePath); } catch {}
                    try { fs.unlinkSync(path.join(os.tmpdir(), `${className}.class`)); } catch {}

                    if (runErr) return res.json({ output: runStderr || runErr.message });
                    res.json({ output: stdout });
                });
            });

        } else {
            return res.status(400).json({ error: 'Language not supported yet' });
        }

        // JS / Python execution
        require('child_process').exec(command, { timeout: 5000 }, (err, stdout, stderr) => {
            try { fs.unlinkSync(filePath); } catch {}
            if (err) return res.json({ output: stderr || err.message });
            res.json({ output: stdout });
        });

    } catch (err) {
        res.status(500).json({ output: err.message });
    }
};

// ----------------------
// File Operations
// ----------------------
exports.getFiles = async (req, res) => {
    try {
        const files = await File.find();
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch files' });
    }
};

exports.saveFile = async (req, res) => {
    try {
        const { _id, name, content, language } = req.body;
        if (_id) {
            // Update existing
            const file = await File.findById(_id);
            if (!file) return res.status(404).json({ error: 'File not found' });
            file.name = name;
            file.content = content;
            file.language = language;
            await file.save();
        } else {
            // Create new
            const file = new File({ name, content, language });
            await file.save();
        }
        res.json({ message: 'File saved successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save file' });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await File.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'File not found' });
        res.json({ message: 'File deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete file' });
    }
};
