var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Logger {
    static remainingStorage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (navigator && navigator.storage && navigator.storage.estimate) {
                const storageEstimate = yield navigator.storage.estimate();
                const usage = storageEstimate.usage || 0;
                const quota = storageEstimate.quota || 0;
                const percentageUsed = (usage / quota) * 100;
                console.info(`You've used ${percentageUsed}% of the available storage.`);
                const remaining = quota - usage;
                console.info(`You can write up to ${remaining} more bytes.`);
            }
        });
    }
}
