"use client";
import { Flex } from "@radix-ui/themes";
import { RefObject, useRef, useState } from "react";
import PlayerList from "./components/PlayerList";
import Results from "./components/Results";
import ScoreList from "./components/ScoreList";
import Settings from "./components/Settings";

export interface Player {
  name: string;
  ref: RefObject<HTMLInputElement>;
  score: number;
}

export interface Score {
  title: string;
  score: number;
  ref: RefObject<HTMLInputElement>;
}

export default function Home() {
  const [round, setRound] = useState(1);
  const [extraScore, setExtraScore] = useState([
    { title: "1st", score: 60, ref: useRef<HTMLInputElement>(null) },
    { title: "2nd", score: 30, ref: useRef<HTMLInputElement>(null) },
    { title: "3rd", score: -30, ref: useRef<HTMLInputElement>(null) },
    { title: "4th", score: -60, ref: useRef<HTMLInputElement>(null) },
  ]);
  const pointRef = useRef<HTMLInputElement>(null);
  const [pointCost, setPointCost] = useState(0.05);
  const [players, setPlayers] = useState([
    { name: "Player A", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player B", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player C", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player D", ref: useRef<HTMLInputElement>(null), score: 0 },
  ]);

  return (
    <Flex direction="column" gap="5">
      <Settings
        extraScore={extraScore}
        setExtraScore={setExtraScore}
        pointCost={pointCost}
        setPointCost={setPointCost}
        pointRef={pointRef}
      />
      <Flex gap="4" align="center" justify="center">
        <PlayerList players={players} setPlayers={setPlayers} />
        <ScoreList
          players={players}
          setPlayers={setPlayers}
          round={round}
          setRound={setRound}
        />
      </Flex>
      <Results
        players={players}
        extraScore={extraScore}
        pointCost={pointCost}
      />
    </Flex>
  );
}
