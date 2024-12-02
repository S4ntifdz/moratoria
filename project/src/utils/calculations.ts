export interface InterestCalculation {
  capital: number;
  tna: number;
  payment:number;
  diasVencidos: number;
}

export interface InterestResult {
  interesDiario: number;
  interesCompensatorio: number;
  interesPunitorio: number;
  montoTotal: number;
  montoSolo : number;
}

export const calculateInterest = ({
  payment,
  capital,
  tna,
  diasVencidos,
}: InterestCalculation): InterestResult => {
  const tasaDiaria = (tna / 365 / 100) * capital;
  const interesCompensatorio = tasaDiaria * diasVencidos;
  const interesPunitorio = interesCompensatorio * 0.5;
  const montoTotal = payment + interesCompensatorio + interesPunitorio;
  const montoSolo = interesCompensatorio + interesPunitorio;
  return {
    interesDiario: tasaDiaria,
    interesCompensatorio,
    interesPunitorio,
    montoTotal,
    montoSolo,
  };
};