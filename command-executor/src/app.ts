import { log } from "console";
import { FfmpegBuilder } from "./commands/ffmpeg/ffmpeg.builder";
import { PromptService } from "./core/prompt/prompt.service";
import { ConsoleLogger } from "./out/console-logger/console-logger";

class App {
    async run() {
        // const res = await PromptService.input<number>('Введите число', 'number');
        // const sHandler = ConsoleLogger.getLogger();
        // sHandler.log(res);
        const args = FfmpegBuilder.new().build();
        console.log(args);
    }
}

const app = new App();
app.run();