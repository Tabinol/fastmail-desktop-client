import { app } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
const PROJECT_ROOT_DIR = path.join(__dirname, '..');
const DIST_DIR = path.join(PROJECT_ROOT_DIR, 'dist');
const VITE_PUBLIC_DIR = app.isPackaged ? DIST_DIR : path.join(PROJECT_ROOT_DIR, 'public');
const FASTMAIL_SVG = path.join(VITE_PUBLIC_DIR, 'fastmail.svg');

export {
    DIST_DIR, FASTMAIL_SVG, PROJECT_ROOT_DIR, VITE_PUBLIC_DIR
};

