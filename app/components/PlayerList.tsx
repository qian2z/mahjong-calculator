"use client";
import {
  Button,
  Flex,
  Kbd,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Dispatch, SetStateAction, useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoMdSave } from "react-icons/io";
import { Player } from "../page";

const PlayerList = ({
  players,
  setPlayers,
}: {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
}) => {
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    const updatedPlayers = players.map((player) => ({
      name: player.ref.current?.value || player.name,
      ref: player.ref,
      score: player.score,
      round_score: player.round_score,
    }));
    setPlayers(updatedPlayers);
    setEdit(false);
  };

  return (
    <Flex direction="column" gap="4" className="w-2/5">
      <Flex align="baseline" justify="center">
        {edit ? (
          <Button onClick={handleSave} variant="classic">
            <IoMdSave /> Save
          </Button>
        ) : (
          <Button onClick={() => setEdit(!edit)} variant="classic">
            <FaPen /> Edit
          </Button>
        )}
      </Flex>
      <Flex direction="column" gap="5">
        {edit &&
          players.map((p) => (
            <TextFieldRoot key={p.name}>
              <TextFieldInput
                defaultValue={p.name}
                ref={p.ref}
                required
                size="3"
                type="text"
              />
            </TextFieldRoot>
          ))}
        {!edit &&
          players.map((p) => (
            <Kbd key={p.name} size="7">
              {p.name}
            </Kbd>
          ))}
      </Flex>
    </Flex>
  );
};

export default PlayerList;
