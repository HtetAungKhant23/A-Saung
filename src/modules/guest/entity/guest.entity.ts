import { GENDER } from '@prisma/client';

export class GuestEntity {
  id: string;

  name: string;

  phone: string;

  image?: string;

  address?: string;

  gender: GENDER;

  startDate: Date | undefined;

  dueDate: Date | undefined;

  day: number;

  spendAmount: number;

  totalMonth: number;

  constructor(
    id: string,
    name: string,
    phone: string,
    gender: GENDER,
    startDate: Date | undefined,
    dueDate: Date | undefined,
    day: number,
    spendAmount: number,
    totalMonth: number,
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.gender = gender;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.day = day;
    this.spendAmount = spendAmount;
    this.totalMonth = totalMonth;
  }
}
