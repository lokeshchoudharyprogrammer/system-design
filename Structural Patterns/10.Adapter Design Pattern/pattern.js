class StorageService {
    upload(file) { }
}


class S3Adapter extends StorageService {
    constructor(s3Client) {
        super();
        this.s3Client = s3Client;
    }

    upload(file) {
        this.s3Client.uploadToS3(file);
    }
}


class R2Adapter extends StorageService {
    constructor(r2Client) {
        super();
        this.r2Client = r2Client;
    }

    upload(file) {
        this.r2Client.putObject(file);
    }
}



class FileService {
    constructor(storageService) {
        this.storageService = storageService;
    }

    saveFile(file) {
        this.storageService.upload(file);
    }
}

const s3 = new S3Client();
const storage = new S3Adapter(s3);
const fileService = new FileService(storage);

fileService.saveFile("photo.png");


// const r2 = new R2Client();
// const storage = new R2Adapter(r2);
// const fileService = new FileService(storage);

// fileService.saveFile("photo.png");