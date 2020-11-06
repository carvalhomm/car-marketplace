/*
* You should code here
*/

import { Loan } from '../models/types';
import { Investment } from '../models/types';
import { MarketplaceItem } from '../models/types';
import { PRIORITY_LIST } from '../models/types';

// EXERCICIO DO MARKETPLACE
//   - Dado uma lista de empréstimos e de investimentos, queremos gerar uma nova lista para exibir os empréstimos no marketplace.
//   - A lista do marketplace deve ser ordenada por categoria e por data de expiração. Ou seja, digamos que tenhamos 2 emprestimos
//   na msm categoria "X". Queremos priorizar o emprestimo que expirará em breve primeiro.
// - Cada item do marketplace contem os seguintes dados (id, totalRequestedAmount, expiresAt, category, totalInvestedAmount)
//   - Cada emprestimo é composto de (id, totalRequestedAmountCents, category, expiresAt)
//   - Cada investimento (id, totalInvestedAmountcents, loanId)
//   - As categorias são (X, Y, Z), sendo que seguem a seguinte ordem de prioridade X < Y < Z


export const generateMarketplaceList = (loanList: Loan[], investmentList: Investment[]): MarketplaceItem[] => {
  try {
    if (!garanteeLists(loanList, investmentList)) { return null; }
    const listaOrdenada = loanList.sort((loan1, loan2) => {
      if (loan1.category === loan2.category) {
        return compareByDate(loan1.expiresAt, loan2.expiresAt);
      }
      if (PRIORITY_LIST[loan1.category] < PRIORITY_LIST[loan2.category]) { return -1; }
      return 1;
    });
    return castLoanToMarketPlaceItem(listaOrdenada, investmentList);
  } catch (err) {
    console.debug('catch of generateMarketPlaceList ----> ', err);
    return null;
  }
}

function garanteeLists(loanList: Loan[], investmentList: Investment[]): boolean {
  if (!loanList || !investmentList) { return null; }
  if (!Array.isArray(loanList) || !Array.isArray(investmentList)) { return false; }
}

function castLoanToMarketPlaceItem(listaOrdenada: Loan[], listaInvestimentos: Investment[]): MarketplaceItem[] {
  const marketList: MarketplaceItem[] = [];
  try {
    for (const loan of listaOrdenada) {
      const totalInvestment: number = getTotalAmountInvested(loan.id, listaInvestimentos);
      marketList.push({
        category: loan.category,
        expiresAt: loan.expiresAt,
        id: loan.id,
        totalInvestmentAmount: totalInvestment / 100,
        totalRequestedAmount: loan.totalRequestedAmountCents / 100
      });
    }
    return marketList;
  } catch (err) {
    console.debug('catch of castLoanToMarketPlaceItem ----> ', err);
    return marketList;
  }
}

function getTotalAmountInvested(loanId: string, listaInvestimentos: Investment[]): number {
  let sum = 0;
  for (const investimento of listaInvestimentos) {
    if (loanId === investimento.loanId) {
      sum += investimento.totalInvestedAmountcents;
    }
  }
  return sum;
}

function compareByDate(loanDate1: Date, loanDate2: Date): number {
  if (!loanDate1 || !loanDate2) { return 0; }
  return loanDate1.getTime() < loanDate2.getTime() ? -1 : 1;
}
