import React, { Fragment } from "react";
import { ExchangeRate } from "../models/ExchangeRate";
import { Grid, GridHeader, GridData } from "../styles/ExchangeRateList";

interface Props {
  exchangeRates: ExchangeRate[];
}

const ExchangeRateList: React.FC<Props> = (props: Props) => (
  <Grid>
    <GridHeader>Country</GridHeader>
    <GridHeader>Currency</GridHeader>
    <GridHeader>Code</GridHeader>
    <GridHeader>Amount</GridHeader>
    <GridHeader>Rate</GridHeader>
    {props.currencies.map((item: Currency, id: number) => (
      <Fragment key={id}>
        <GridData textAlign="left">{item.country}</GridData>
        <GridData textAlign="left">{item.currency}</GridData>
        <GridData textAlign="left">{item.code}</GridData>
        <GridData textAlign="right">{item.amount}</GridData>
        <GridData textAlign="right">{item.rate.toFixed(2)}</GridData>
      </Fragment>
    ))}
  </Grid>
);

export default ExchangeRateList;
