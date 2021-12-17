export class User {
  constructor(
    public idNumber: number,
    public role: string,
    public name: string,
    public lastname: string,
    public email: string,
    public password: string,
    public phone?: number
  ) {}
}
