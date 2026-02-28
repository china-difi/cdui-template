// fs/promises 不稳定，有时会出现异步错误无法捕获的异步
import fs, { PathLike, PathOrFileDescriptor } from 'fs';

const exists = (path: PathLike): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const mkdir = (path: PathLike) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(void 0);
      }
    });
  });
};

const readFile = (
  path: PathOrFileDescriptor,
  options?: BufferEncoding | (fs.ObjectEncodingOptions & { flag?: string }),
): Promise<string | Buffer> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (
  path: PathOrFileDescriptor,
  data: string | DataView,
  options?: BufferEncoding | (fs.ObjectEncodingOptions & { flag?: string }),
): Promise<string | Buffer> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(void 0);
      }
    });
  });
};

export default {
  exists,
  readFile,
  mkdir,
  writeFile,
};
