
class VacationModel {
    public vacationID: number;
    public description: string;
    public destination: string;
    public imageName: string;
    public image: FileList;
    public dateStart: Date;
    public dateEnd: Date;
    public price: number;
    public followers: number;

    public constructor(vacation: VacationModel) {
        this.vacationID = vacation.vacationID;
        this.description = vacation.description;
        this.destination = vacation.destination;
        this.imageName = vacation.imageName;
        this.image = vacation.image;
        this.dateStart = vacation.dateStart;
        this.dateEnd = vacation.dateEnd;
        this.price = vacation.price;
        this.followers = vacation.followers;
    }
}

export default VacationModel;