import {
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
import { Player, Score } from "../page";

interface FinalPlayer {
  name: string;
  final_score: number;
  money: number;
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
    }));
    final_players = final_players.sort((a, b) => b.final_score - a.final_score);
    final_players.forEach((player, index) => {
      const scoreIndex = index % extraScore.length;
      player.final_score = player.final_score + extraScore[scoreIndex].score;
    });

    final_players.forEach((player) => {
      player.money = player.final_score * pointCost;
    });
    setResults(final_players);
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
              Final Points
            </TableColumnHeaderCell>
            <TableColumnHeaderCell justify="center">RM</TableColumnHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results?.map((r) => (
            <TableRow key={r.name} align="center">
              <TableRowHeaderCell justify="center">{r.name}</TableRowHeaderCell>
              <TableCell justify="center">{r.final_score}</TableCell>
              <TableCell justify="center">
                <Text size="5" weight="bold" color="red">
                  {r.money.toFixed(2)}
                </Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
    </Flex>
  );
};

export default Results;
