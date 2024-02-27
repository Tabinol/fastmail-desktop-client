import { app } from "electron";
import path from 'path';

const EXTRA_RESOURCES_DIR = 'resources';

const PROJECT_ROOT_DIR: string = path.join(__dirname, '..');
const RESOURCES_PATH: string = app.isPackaged ?
    path.join(process.resourcesPath, EXTRA_RESOURCES_DIR) : path.join(PROJECT_ROOT_DIR, EXTRA_RESOURCES_DIR);

export {
    PROJECT_ROOT_DIR,
    RESOURCES_PATH
};

