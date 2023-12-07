import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecutor } from '../../core/executor/command.executor';
import { StreamLoggerInterface } from '../../core/handlers/stream-logger.interface';
import { FfmpegExecInterface, FfmpegInput } from './ffmpeg.types';
import { PromptService } from '../../core/prompt/prompt.service';
import { FfmpegBuilder } from './ffmpeg.builder';
import { StreamHandler } from '../../core/handlers/stream.handler';
import { FileService } from '../../core/files/file.service';

export class FfmpegExecutor extends CommandExecutor<FfmpegInput> {
    private promptService = new PromptService();
    private fileService = new FileService();

    constructor(logger: StreamLoggerInterface) {
        super(logger);
    }

    protected async receiveData(): Promise<FfmpegInput> {
        const path = await this.promptService.input<string>('Input file path', 'input');
        const width = await this.promptService.input<number>('width', 'number');
        const height = await this.promptService.input<number>('height', 'number');
        const filename = await this.promptService.input<string>('Output filename', 'input');
        return {
            path,
            width,
            height,
            filename
        };
    }

    protected buildCommand(data: FfmpegInput): FfmpegExecInterface {
        const command = 'ffmpeg';
        const output = new FileService().getFilePath(data.path, data.filename, 'mp4');
        const args = FfmpegBuilder.new()
            .withInputFile(data.path)
            .withVideoSize(data.width, data.height)
            .withOutputFile(output)
            .build();
        return { command, args, output };
    }

    protected spawnCommand(command: FfmpegExecInterface): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExist(command.output);
        return spawn(command.command, [...command.args]);
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void {
        const handler = new StreamHandler(logger);
        handler.proccessOutput(stream);
    }
}
