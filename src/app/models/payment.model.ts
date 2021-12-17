export class Payment {
  constructor(
    public pid: string,
    public paymentType: String,
    public description: String,
    public date: Date,
    public paidBy: String,
    public idNumber: Number
  ) {}
}
