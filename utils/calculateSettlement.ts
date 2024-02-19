import { FinalPlayer, Settlement } from "@/app/components/Results";

export const calculateSettlement = (players: FinalPlayer[]) => {
  const settlements: Settlement[] = [];
  let payerIndex = players.length - 1;
  let payeeIndex = 0;
  while (payeeIndex < payerIndex) {
    const payer = players[payerIndex];
    const payee = players[payeeIndex];

    const settlementAmount = Math.min(
      payee.money - payee.settlement,
      -payer.money + payer.settlement
    );

    settlements.push({
      payer,
      payee,
      amount: parseFloat(settlementAmount.toFixed(2)),
    });

    payer.settlement -= settlementAmount;
    payee.settlement += settlementAmount;

    if (payer.settlement == payer.money) payerIndex--;
    if (payee.settlement == payee.money) payeeIndex++;
  }
  return settlements;
};
