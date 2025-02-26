"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
const util_1 = require("../config/util");
const rootPath = process.cwd();
const dataPath = path_1.default.join(rootPath, 'data/');
const configPath = path_1.default.join(dataPath, 'config/');
const scriptPath = path_1.default.join(dataPath, 'scripts/');
const logPath = path_1.default.join(dataPath, 'log/');
const samplePath = path_1.default.join(rootPath, 'sample/');
const confFile = path_1.default.join(configPath, 'config.sh');
const authConfigFile = path_1.default.join(configPath, 'auth.json');
const sampleConfigFile = path_1.default.join(samplePath, 'config.sample.sh');
const sampleAuthFile = path_1.default.join(samplePath, 'auth.sample.json');
exports.default = async () => {
    const authFileExist = await (0, util_1.fileExist)(authConfigFile);
    const confFileExist = await (0, util_1.fileExist)(confFile);
    const scriptDirExist = await (0, util_1.fileExist)(scriptPath);
    const logDirExist = await (0, util_1.fileExist)(logPath);
    const configDirExist = await (0, util_1.fileExist)(configPath);
    if (!configDirExist) {
        fs_1.default.mkdirSync(configPath);
    }
    if (!authFileExist) {
        fs_1.default.writeFileSync(authConfigFile, fs_1.default.readFileSync(sampleAuthFile));
    }
    if (!confFileExist) {
        fs_1.default.writeFileSync(confFile, fs_1.default.readFileSync(sampleConfigFile));
    }
    if (!scriptDirExist) {
        fs_1.default.mkdirSync(scriptPath);
    }
    if (!logDirExist) {
        fs_1.default.mkdirSync(logPath);
    }
    dotenv_1.default.config({ path: confFile });
    logger_1.default.info('✌️ Init file down');
};
//# sourceMappingURL=initFile.js.map