export class Logger {
    public static async remainingStorage(): Promise<void> {
        if (navigator.storage && navigator.storage.estimate) {
            const storageEstimate = await navigator.storage.estimate();
            const usage = storageEstimate.usage || 0;
            const quota = storageEstimate.quota || 0;
            
            const percentageUsed = (usage / quota) * 100;
            console.info(`You've used ${percentageUsed}% of the available storage.`);
            
            const remaining = quota - usage;
            console.info(`You can write up to ${remaining} more bytes.`);
        }
    }
}