import { SetupConstants } from '../support/constants/SetupConstants';
import fs from 'fs';
import path from 'path';

export class ReportCleanup {
    /**
     * Cleans up old HTML reports and log files, keeping only the latest N.
     * @param maxToKeep Number of most recent items to keep.
     */
    public static cleanOldReports(maxToKeep = SetupConstants.FIVE): void {
        this.cleanupHtmlReports(maxToKeep);
        this.cleanupLogFiles(maxToKeep);
    }

    /**
     * Deletes old timestamped HTML report folders under reports/html
     */
    private static cleanupHtmlReports(maxToKeep: number): void {
        const htmlReportsPath = path.join('reports', 'html');

        if (!fs.existsSync(htmlReportsPath)) return;

        const reportDirs = fs.readdirSync(htmlReportsPath)
            .filter((dir) => fs.lstatSync(path.join(htmlReportsPath, dir)).isDirectory())
            .sort((a, b) => {
                return fs.statSync(path.join(htmlReportsPath, b)).ctime.getTime() -
                    fs.statSync(path.join(htmlReportsPath, a)).ctime.getTime();
            });

        const excessDirs = reportDirs.slice(maxToKeep);
        for (const dir of excessDirs) {
            const fullPath = path.join(htmlReportsPath, dir);
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`🧹 Deleted old report: ${fullPath}`);
        }
    }

    /**
     * Deletes old log files under reports/logfiles, keeping only the latest N
     */
    private static cleanupLogFiles(maxToKeep: number): void {
        const logFilesPath = path.join('reports', 'logfiles');

        if (!fs.existsSync(logFilesPath)) return;

        const logFiles = fs.readdirSync(logFilesPath)
            .filter((file) => file.startsWith('testLog_') && file.endsWith('.log'))
            .sort((a, b) => {
                return fs.statSync(path.join(logFilesPath, b)).ctime.getTime() -
                    fs.statSync(path.join(logFilesPath, a)).ctime.getTime();
            });

        const excessLogs = logFiles.slice(maxToKeep);
        for (const logFile of excessLogs) {
            const fullPath = path.join(logFilesPath, logFile);
            fs.unlinkSync(fullPath);
            console.log(`🧹 Deleted old log file: ${fullPath}`);
        }
    }
}