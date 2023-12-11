
export interface IExchangeSuccessResponse {
  validFor: string;
  order: number;
  country: string;
  currency: string;
  amount: number;
  currencyCode: string;
  rate: number;
}


export interface IExchangeErrorResponse {
  description: string;
  endPoint: string;
  errorCode: string;
  happenedAt: string;
  messageId: string;
}

export interface IExchangeInternalServerErrorResponse extends IExchangeErrorResponse {
  errorCode: "INTERNAL_SERVER_ERROR";
}

