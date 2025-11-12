const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os'); // For temp files

exports.runCode = async (req, res) => {
    const { language, code } = req.body;

    try {
        if (!language || !code) {
            return res.status(400).json({ error: 'Language and code are required' });
        }

        const fileName = `temp_${Date.now()}`;
        let filePath, command;

        // ----------------------
        // JavaScript
        // ----------------------
        if (language === 'javascript') {
            filePath = path.join(os.tmpdir(), `${fileName}.js`);
            fs.writeFileSync(filePath, code);
            command = `node "${filePath}"`;

        // ----------------------
        // Python
        // ----------------------
        } else if (language === 'python') {
            filePath = path.join(os.tmpdir(), `${fileName}.py`);
            fs.writeFileSync(filePath, code);
            command = `python3 "${filePath}"`;

        // ----------------------
        // Java
        // ----------------------
        } else if (language === 'java') {
            // Extract class name from the code
            const classMatch = code.match(/public\s+class\s+(\w+)/);
            if (!classMatch) {
                return res.status(400).json({ error: 'Java code must have a public class' });
            }
            const className = classMatch[1];
            filePath = path.join(os.tmpdir(), `${className}.java`);
            fs.writeFileSync(filePath, code);

            const compileCommand = `javac "${filePath}"`;
            const runCommand = `java -cp "${os.tmpdir()}" ${className}`;

            console.log('Compiling Java:', compileCommand);
            return exec(compileCommand, { timeout: 5000 }, (compileErr, stdout, stderr) => {
                if (compileErr) {
                    try { fs.unlinkSync(filePath); } catch {}
                    return res.json({ output: stderr || compileErr.message });
                }

                exec(runCommand, { timeout: 5000 }, (runErr, runStdout, runStderr) => {
                    // Cleanup temp files
                    try { fs.unlinkSync(filePath); } catch {}
                    try { fs.unlinkSync(path.join(os.tmpdir(), `${className}.class`)); } catch {}

                    if (runErr) {
                        return res.json({ output: runStderr || runErr.message });
                    }
                    res.json({ output: runStdout });
                });
            });

        // ----------------------
        // Unsupported language
        // ----------------------
        } else {
            return res.status(400).json({ error: 'Language not supported yet' });
        }

        // ----------------------
        // JS / Python execution
        // ----------------------
        console.log('Executing:', command);

        exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            try { fs.unlinkSync(filePath); } catch (err) { console.log('File delete error:', err); }

            if (error) {
                console.log('Execution error:', error, 'Stderr:', stderr);
                return res.json({ output: stderr || error.message });
            }

            res.json({ output: stdout });
        });

        // Fallback: prevent hanging
        setTimeout(() => {
            if (!res.headersSent) {
                res.json({ output: 'Execution timed out or failed' });
            }
        }, 6000);

    } catch (err) {
        console.log('Unexpected error:', err);
        res.status(500).json({ output: err.message });
    }
};
