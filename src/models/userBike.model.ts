export interface Bike {
  frameNumber: string;
  producer: string;
  model: string;
  size: string;
  color: string;
}

export class UserBike implements Bike {
  /* TODO: add class-validator */
  constructor(
    public frameNumber: string,
    public producer: string,
    public model: string,
    public size: string,
    public color: string,
  ) {}
}
