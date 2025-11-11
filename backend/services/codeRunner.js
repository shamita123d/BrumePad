// Extend this later with Docker containers for multi-language execution
exports.runCode = async (language, code) => {
    // Currently just returns the code
    return `Code in ${language}: ${code}`;
};
