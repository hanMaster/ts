abstract class Logger {
    abstract log(message: string): void;

    printDate(): void {
        this.log(new Date().toDateString());
    }
}

class MyLogger extends Logger {
    log(message: string): void {
        console.log(message);
    }

    logWithDate(message: string): void {
        this.printDate();
        this.log(message);
    }
}

const logger = new MyLogger().logWithDate('test');
