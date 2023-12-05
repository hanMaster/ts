import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { CommandExecInterface } from "../../core/executor/command.types";
import { StreamLoggerInterface } from "../../core/handlers/stream-logger.interface";
import { FfmpegInput } from "./ffmpeg.types";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";
import { StreamHandler } from "../../core/handlers/stream.handler";
import { FileService } from "../../core/files/file.service";

export class FfmpegExecutor extends CommandExecutor<FfmpegInput> {

    private promptService = new PromptService();
    private fileService = new FileService();

    constructor(logger: StreamLoggerInterface) {
        super(logger);
    }

    protected async receiveData(): Promise<FfmpegInput> {
        const path = await this.promptService.input<string>('Введите путь для сохранения файла', 'input');
        const width = await this.promptService.input<number>('Введите ширину', 'number');
        const height = await this.promptService.input<number>('Введите высоту', 'number');
        const filename = await this.promptService.input<string>('Введите имя файла', 'input');
        return {
            path, width, height, filename
        };
    }

    protected buildCommand(data: FfmpegInput): CommandExecInterface {
        const command = 'ffmpeg';
        const args = FfmpegBuilder.new().withPath(data.path).withVideoSize(data.width, data.height).withFilename(data.filename).build();
        return { command, args };
    }

    protected spawnCommand(command: CommandExecInterface): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(command.args[command.args.length - 1]);
        return spawn(command.command, [...command.args]);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
        const handler = new StreamHandler(logger);
        handler.proccessOutput(stream);
    }
}