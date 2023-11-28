"use strict";
class Logger {
    printDate() {
        this.log(new Date().toDateString());
    }
}
class MyLogger extends Logger {
    log(message) {
        console.log(message);
    }
    logWithDate(message) {
        this.printDate();
        this.log(message);
    }
}
const logger = new MyLogger().logWithDate('test');
