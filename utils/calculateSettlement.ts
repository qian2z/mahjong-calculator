import { FinalPlayer, Settlement } from "@/app/components/Results";

export const calculateSettlement = (players: FinalPlayer[]) => {
  const sortedPlayers = players.sort((a, b) => a.money - b.money);
  const settlements: Settlement[] = [];
  let payerIndex = 0;
  let payeeIndex = sortedPlayers.length - 1;
  while (payerIndex < payeeIndex) {
    const payer = sortedPlayers[payerIndex];
    const payee = sortedPlayers[payeeIndex];

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

    if (payer.settlement == payer.money) payerIndex++;
    if (payee.settlement == payee.money) payeeIndex--;
  }
  return settlements;
};
