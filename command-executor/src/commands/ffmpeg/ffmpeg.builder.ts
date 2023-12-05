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

    build(): string {
        return `-i ${this.path} -c:v libx264 -s ${this.width}x${this.height} ${this.path}${this.filename}`;
    }
}