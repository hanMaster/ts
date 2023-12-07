import { FileService } from '../../core/files/file.service';

export class FfmpegBuilder {
    private inputFile: string = '';
    private outputFile: string = '';
    private width: number = 0;
    private height: number = 0;

    static new(): FfmpegBuilder {
        return new FfmpegBuilder();
    }

    withInputFile(inputFile: string): this {
        this.inputFile = inputFile;
        return this;
    }

    withVideoSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    withOutputFile(outputFile: string): this {
        this.outputFile = outputFile;
        return this;
    }

    build(): string[] {
        const result = ['-i'];
        result.push(this.inputFile);
        result.push('-c:v');
        result.push('libx264');
        result.push('-s');
        result.push(`${this.width}x${this.height}`);
        result.push(this.outputFile);

        return result;
    }
}
