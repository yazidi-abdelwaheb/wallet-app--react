


export default interface ICard {
  _id : string;
  cardNumber: string;
  userId: string;
  amount: number;
  weeklyLimit: number;
  spentThisWeek: number;
  lastReset: Date;
  createdAt: Date;
  holderName : string;
  isActive : boolean;
  isDeleted : boolean;
}
