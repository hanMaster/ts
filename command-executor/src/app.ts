import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "./out/console-logger/console-logger";

class App {
    async run() {
        const executor = new FfmpegExecutor(ConsoleLogger.getLogger()).execute();
    }
}

const app = new App();
app.run();