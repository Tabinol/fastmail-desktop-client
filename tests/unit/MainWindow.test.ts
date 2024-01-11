import { describe, expect, it } from '@jest/globals';
import MainWindow from '../../app/MainWindow';

jest.mock('electron', () => {
    const mockApp = {};
    return { app: mockApp };
});

const mainWindow = new MainWindow();

// Temp test
describe('a equals 1', () => {

    const a = 1;

    it('should return 1', () => {
        expect(a).toBe(1);
    });
});
