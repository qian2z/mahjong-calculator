import { calculateDifferencesAndSum } from "@/utils/calculateDifferenceAndSum";
import { calculateSettlement } from "@/utils/calculateSettlement";
import { Button, Flex } from "@radix-ui/themes";
import { useState } from "react";
import { FaCalculator } from "react-icons/fa";
import { Player, Score } from "../page";
import CalculationDialog from "./CalculationDialog";
import ResultsTable from "./ResultsTable";

export interface FinalPlayer {
  name: string;
  round_score: number[];
  score_detail: number[];
  final_score: number;
  money: number;
  settlement: number;
}

export interface Settlement {
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

  const showResults = () => {
    const score_results = calculateDifferencesAndSum(players);
    let final_players = score_results.map((s, index) => ({
      name: players[index].name,
      round_score: players[index].round_score,
      score_detail: s.score_detail,
      final_score: s.sum,
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

  return (
    <Flex align="center" justify="center" direction="column" gap="3">
      <Button size="4" onClick={showResults}>
        <FaCalculator /> Results
      </Button>
      {results.length === 0 ? null : (
        <ResultsTable results={results} settlement={settlement} />
      )}
      {results.length === 0 ? null : (
        <CalculationDialog players={results} extraScore={extraScore} />
      )}
    </Flex>
  );
};

export default Results;
