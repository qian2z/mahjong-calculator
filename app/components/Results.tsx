import {
  Badge,
  Button,
  Flex,
  TableBody,
  TableCell,
  TableColumnHeaderCell,
  TableHeader,
  TableRoot,
  TableRow,
  TableRowHeaderCell,
  Text,
} from "@radix-ui/themes";
import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { Player, Score } from "../page";

export interface FinalPlayer {
  name: string;
  final_score: number;
  money: number;
  settlement: number;
}

interface Settlement {
  payer: FinalPlayer;
  payee: FinalPlayer;
  amount: number;
}

const Results = ({
  players,
  extraScore,
  pointCost,
}: {
  players: Player[];
  extraScore: Score[];
  pointCost: number;
}) => {
  const [results, setResults] = useState<FinalPlayer[]>([]);
  const [settlement, setSettlement] = useState<Settlement[]>([]);

  const calculateDifferencesAndSum = () => {
    const rr: number[] = [];
    for (let i = 0; i < players.length; i++) {
      const playerScore = players[i].score;
      const differencesAndSum = players.map((player, index) => {
        if (index === i) return 0;
        const difference = player.score - playerScore;
        return difference;
      });
      rr.push(
        differencesAndSum.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0)
      );
    }
    return rr;
  };

  const showResults = () => {
    const score_results = calculateDifferencesAndSum();
    let final_players = score_results.map((s, index) => ({
      name: players[index].name,
      final_score: s,
      money: 0,
      settlement: 0,
    }));
    final_players = final_players.sort((a, b) => b.final_score - a.final_score);
    final_players.forEach((player, index) => {
      const scoreIndex = index % extraScore.length;
      player.final_score = player.final_score + extraScore[scoreIndex].score;
    });
    final_players.forEach((player) => {
      player.money = parseFloat((player.final_score * pointCost).toFixed(2));
    });
    setResults(final_players);
    setSettlement(calculateSettlement(final_players));
  };

  const calculateSettlement = (players: FinalPlayer[]) => {
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

  return (
    <Flex align="center" justify="center" direction="column" gap="3">
      <Button size="4" onClick={showResults}>
        <FaCalculator /> Results
      </Button>
      <TableRoot size="3" variant="surface">
        <TableHeader>
          <TableRow align="center">
            <TableColumnHeaderCell justify="center">
              Player
            </TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">
              Points
            </TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">
              Settlement
            </TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results?.map((r) => (
            <TableRow key={r.name} align="center">
              <TableRowHeaderCell justify="center">{r.name}</TableRowHeaderCell>
              <TableCell justify="center">{r.final_score}</TableCell>
              <TableCell>
                <Flex direction="column" gap="2">
                  {settlement
                    ?.filter((s) => s.payer.name === r.name)
                    .map((s) => (
                      <Flex gap="2" align="center" justify="start">
                        <FaArrowRight />
                        <Text size="2" weight="bold">
                          {s.payee.name}
                        </Text>
                        <Text size="3" weight="bold" color="blue">
                          {s.amount}
                        </Text>
                      </Flex>
                    ))}
                  <Flex gap="2">
                    <Badge>Total</Badge>
                    <Text
                      size="3"
                      weight="bold"
                      color={r.money < 0 ? "red" : "green"}
                    >
                      {r.money}
                    </Text>
                  </Flex>
                </Flex>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Flex>
  );
};

export default Results;
