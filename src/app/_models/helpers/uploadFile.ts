export class UploadFile {
  file: File
  url: string

  constructor(file: File) {
    this.file = file;
  }

  get name() {
    return this.file.name;
  }
  get lastModified() {
    return this.file.lastModified;
  }
  get size() {
    return this.file.size;
  }
  get type() {
    return this.file.type;
  }
}