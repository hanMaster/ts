import { ChildProcessWithoutNullStreams } from "child_process";
import { StreamLoggerInterface } from "../handlers/stream-logger.interface";
import { CommandExecInterface } from "./command.types";

export abstract class CommandExecutor<Input> {
    constructor(private logger: StreamLoggerInterface) { }

    public async execute() {
        const data = await this.receiveData();
        const command = this.buildCommand(data);
        const stream = this.spawnCommand(command);
        this.processStream(stream, this.logger);
    }

    protected abstract receiveData(): Promise<Input>;
    protected abstract buildCommand(data: Input): CommandExecInterface;
    protected abstract spawnCommand(command: CommandExecInterface): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: StreamLoggerInterface): void;
}