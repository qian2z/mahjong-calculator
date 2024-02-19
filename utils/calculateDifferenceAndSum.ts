import { Player } from "@/app/page";

export const calculateDifferencesAndSum = (players: Player[]) => {
  const rr: {
    score_detail: number[];
    sum: number;
  }[] = [];
  for (let i = 0; i < players.length; i++) {
    const playerScore = players[i].score;
    const differencesAndSum = players.map((player, index) => {
      if (index === i) return 0;
      const difference = player.score - playerScore;
      return difference;
    });
    rr.push({
      score_detail: differencesAndSum.filter((s) => s !== 0),
      sum: differencesAndSum.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0),
    });
  }
  return rr;
};
