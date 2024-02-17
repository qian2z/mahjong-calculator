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

  const handleSave = () => {
    const updatedPlayers = players.map((player) => ({
      name: player.name,
      ref: player.ref,
      score: player.score + parseInt(player.ref.current?.value!),
    }));
    setPlayers(updatedPlayers);
    setRound(round + 1);
    setAdd(false);
  };

  return (
    <Flex direction="column" gap="4" className="w-2/5">
      <Flex align="baseline" justify="center" gap="3">
        <Heading>R{round}</Heading>
        {add ? (
          <Button onClick={handleSave}>
            <IoMdSave /> Save
          </Button>
        ) : (
          <Button onClick={() => setAdd(!add)}>
            <FaPlus /> Add
          </Button>
        )}
      </Flex>

      <Flex direction="column" gap="5">
        {add &&
          players.map((p) => (
            <TextFieldRoot key={p.name}>
              <TextFieldInput defaultValue={0} ref={p.ref} required size="3" />
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
