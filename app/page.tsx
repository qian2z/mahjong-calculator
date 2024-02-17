"use client";
import { Flex } from "@radix-ui/themes";
import { RefObject, useRef, useState } from "react";
import PlayerList from "./components/PlayerList";
import Results from "./components/Results";
import ScoreList from "./components/ScoreList";

export interface Player {
  name: string;
  ref: RefObject<HTMLInputElement>;
  score: number;
}

export default function Home() {
  const [round, setRound] = useState(1);

  const [players, setPlayers] = useState([
    { name: "Player A", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player B", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player C", ref: useRef<HTMLInputElement>(null), score: 0 },
    { name: "Player D", ref: useRef<HTMLInputElement>(null), score: 0 },
  ]);

  return (
    <Flex direction="column" gap="5">
      <Flex gap="4" align="center" justify="center">
        <PlayerList players={players} setPlayers={setPlayers} />
        <ScoreList
          players={players}
          setPlayers={setPlayers}
          round={round}
          setRound={setRound}
        />
      </Flex>
      <Results players={players} />
    </Flex>
  );
}
