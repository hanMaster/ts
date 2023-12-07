import { CommandExecInterface } from '../../core/executor/command.types';

export interface FfmpegInput {
    path: string;
    width: number;
    height: number;
    filename: string;
}

export interface FfmpegExecInterface extends CommandExecInterface {
    output: string;
}
