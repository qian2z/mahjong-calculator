"use client";
import {
  Button,
  Flex,
  Heading,
  Kbd,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import { Player } from "../page";

const ScoreList = ({
  players,
  setPlayers,
  round,
  setRound,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  round: number;
  setRound: Dispatch<SetStateAction<number>>;
}) => {
  const [add, setAdd] = useState(false);
  const [canAdd, setCanAdd] = useState(false);

  const handleSave = () => {
    const updatedPlayers = players.map((player) => ({
      name: player.name,
      ref: player.ref,
      score: player.score + (parseInt(player.ref.current?.value!) || 0),
      round_score: [
        ...player.round_score,
        parseInt(player.ref.current?.value!) || 0,
      ],
    }));
    setPlayers(updatedPlayers);
    setAdd(false);
    if (round === 1) {
      setCanAdd(true);
    }
  };

  return (
    <Flex direction="column" gap="4" className="w-2/5">
      <Flex align="baseline" justify="center" gap="3">
        <Heading>R{round}</Heading>
        {add ? (
          <Button onClick={handleSave} variant="classic">
            <IoMdSave /> Save
          </Button>
        ) : (
          <Button
            onClick={() => {
              setAdd(!add);
              if (canAdd) {
                setRound(round + 1);
              }
            }}
            variant="classic"
          >
            <FaPlus /> Add
          </Button>
        )}
      </Flex>

      <Flex direction="column" gap="5">
        {add &&
          players.map((p) => (
            <TextFieldRoot key={p.name}>
              <TextFieldInput
                ref={p.ref}
                required
                size="3"
                type="number"
                min={0}
              />
            </TextFieldRoot>
          ))}
        {!add &&
          players.map((p) => (
            <Kbd key={p.name} size="7">
              {p.score}
            </Kbd>
          ))}
      </Flex>
    </Flex>
  );
};

export default ScoreList;
