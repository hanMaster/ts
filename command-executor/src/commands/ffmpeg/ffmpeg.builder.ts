import { FileService } from "../../core/files/file.service";

export class FfmpegBuilder {

    private path: string = './';
    private width: number = 800;
    private height: number = 600;
    private filename: string = 'out';

    static new(): FfmpegBuilder {
        return new FfmpegBuilder();
    }

    withPath(path: string): this {
        this.path = path;
        return this;
    }

    withVideoSize(width: number, height: number): this {
        this.width = width;
        this.height = height;
        return this;
    }

    withFilename(filename: string): this {
        this.filename = filename;
        return this;
    }

    build(): string[] {
        const fullName = new FileService().getFilePath(this.path, this.filename);

        const result = ['-i'];
        result.push(this.path);
        result.push('-c:v');
        result.push('libx264');
        result.push('-s');
        result.push(`${this.width}x${this.height}`);
        result.push(fullName);

        return result;
    }
}