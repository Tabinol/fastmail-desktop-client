import path from 'node:path';

const PROJECT_ROOT_DIR = path.join(__dirname, '../..');
const RESOURCES_DIR = path.join(PROJECT_ROOT_DIR, 'resources');
const FASTMAIL_SVG = path.join(RESOURCES_DIR, 'fastmail.svg');

export { FASTMAIL_SVG, PROJECT_ROOT_DIR, RESOURCES_DIR };
