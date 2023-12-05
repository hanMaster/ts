import { PromptService } from "./core/prompt/prompt.service";
import { ConsoleLogger } from "./out/console-logger/console-logger";

class App {
    async run() {
        const res = await PromptService.input<number>('Введите число', 'number');
        const sHandler = ConsoleLogger.getLogger();
        sHandler.log(res);
    }
}

const app = new App();
app.run();