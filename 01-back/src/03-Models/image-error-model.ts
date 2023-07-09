
class ImageError {

    public status:  number;
    public message: string;
    public date: Date;

    public constructor(status: number, message: string,date:Date) {
        this.status = status;
        this.message = message;
        this.date = date;
    }
}

export default ImageError;