// Placeholder for code execution
exports.runCode = async (req, res) => {
    const { language, code } = req.body;
    // For now, just echo code (add Docker-based runner later)
    res.json({ output: `Received code in ${language}:\n${code}` });
};
