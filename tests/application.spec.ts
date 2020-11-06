/*
* You can also modify this file to write tests
*/

import { Category, Investment, Loan } from "../models/types";
import { generateMarketplaceList } from '../src/application';

const loanList: Loan[] = [
  {
    category: Category.X,
    expiresAt: new Date(),
    id: 'A',
    totalRequestedAmountCents: 100
  },
  {
    category: Category.Y,
    expiresAt: new Date(),
    id: 'B',
    totalRequestedAmountCents: 50
  },
  {
    category: Category.Z,
    expiresAt: new Date(),
    id: 'AA',
    totalRequestedAmountCents: 50
  },
  {
    category: Category.X,
    expiresAt: new Date(2017, 10, 10),
    id: 'BB',
    totalRequestedAmountCents: 50
  },
  {
    category: Category.X,
    expiresAt: new Date(2015, 10, 10),
    id: 'CC',
    totalRequestedAmountCents: 50
  },
  {
    category: Category.Y,
    expiresAt: new Date(2018, 1, 10),
    id: 'DD',
    totalRequestedAmountCents: 50
  },
];

const investmentList: Investment[] = [
  {
    id: 'C',
    loanId: 'A',
    totalInvestedAmountcents: 50
  },
  {
    id: 'D',
    loanId: 'A',
    totalInvestedAmountcents: 500
  },
  {
    id: 'E',
    loanId: 'A',
    totalInvestedAmountcents: 250
  }
];

describe('general testing', () => {
  const lista = generateMarketplaceList(loanList, investmentList);
  console.log('lista --> ', lista);

  it('X before Y', () => {
    expect(lista[0].category).toBe(Category.X);
  });

  it('total invested to be 800', () => {
    expect(lista[2].totalInvestmentAmount).toBe(800);
  });

  it('ordenating by expire date', () => {
    expect(lista[0].expiresAt.getTime() < lista[1].expiresAt.getTime()).toBe(true);
  });

});
