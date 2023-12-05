import { promises } from "fs";
import { dirname, isAbsolute, join } from "path";

export class FileService {

    public getFilePath(path: string, name: string): string;
    public getFilePath(path: string, name: string, ext?: string): string {
        if (!isAbsolute(path)) {
            path = join(__dirname, path);
        }
        if (typeof 'ext' === 'string') {
            return join(dirname(path), `${name}.${ext}`);
        } else {
            return join(dirname(path), name);
        }
    };

    public async deleteFileIfExist(path: string) {
        if (await this.isExist(path)) {
            promises.unlink(path);
        }
    };

    private async isExist(path: string): Promise<boolean> {
        try {
            await promises.stat(path);
            return true;
        } catch {
            return false;
        }
    }
}