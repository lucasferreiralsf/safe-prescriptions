import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    dotenv.config({
      path: filePath,
    });
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  async getFile(fileName: string): Promise<any> {
    const file = await import(path.resolve(__dirname, '..', `config/${fileName}.config`));
    return file.default;
  }
}