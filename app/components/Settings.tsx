"use client";
import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
  Flex,
  Heading,
  Text,
  TextFieldInput,
  TextFieldRoot,
} from "@radix-ui/themes";
import { Dispatch, RefObject, SetStateAction } from "react";
import { GrPowerReset } from "react-icons/gr";
import { IoIosSettings, IoMdSave } from "react-icons/io";
import { Score } from "../page";

interface Props {
  extraScore: Score[];
  setExtraScore: Dispatch<SetStateAction<Score[]>>;
  pointCost: number;
  setPointCost: Dispatch<SetStateAction<number>>;
  pointRef: RefObject<HTMLInputElement>;
}

const Settings = ({
  extraScore,
  setExtraScore,
  pointCost,
  setPointCost,
  pointRef,
}: Props) => {
  const handleSave = () => {
    const updatedScore = extraScore.map((score) => ({
      title: score.title,
      score: parseInt(score.ref.current?.value!),
      ref: score.ref,
    }));
    setExtraScore(updatedScore);
    if (pointRef.current) {
      setPointCost(parseFloat(pointRef.current.value));
    }
  };

  return (
    <Flex align="center" justify="center" gap="2">
      <Button onClick={() => location.reload()} color="red">
        <GrPowerReset />
        Reset
      </Button>
      <DialogRoot>
        <DialogTrigger>
          <Button color="orange">
            <IoIosSettings />
            Setting
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Flex direction="column" gap="5">
            <Flex direction="column" gap="3">
              <Heading>Base Points</Heading>
              {extraScore.map((p) => (
                <Flex key={p.title}>
                  <Flex className="w-1/6">
                    <Text size="4" key={p.title}>
                      {p.title}
                    </Text>
                  </Flex>
                  <TextFieldRoot key={p.title} ml="4">
                    <TextFieldInput
                      defaultValue={p.score}
                      required
                      type="number"
                      size="3"
                      ref={p.ref}
                    />
                  </TextFieldRoot>
                </Flex>
              ))}
            </Flex>
            <Flex direction="column" gap="3">
              <Heading>Point Cost</Heading>
              <Flex align="baseline" gap="3">
                <Text size="4">RM </Text>
                <TextFieldRoot className="w-1/6">
                  <TextFieldInput
                    defaultValue={pointCost}
                    size="3"
                    required
                    type="text"
                    ref={pointRef}
                  />
                </TextFieldRoot>
                <Text size="4"> per Point</Text>
              </Flex>
            </Flex>
            <DialogClose>
              <Flex>
                <Button onClick={handleSave}>
                  <IoMdSave /> Save
                </Button>
              </Flex>
            </DialogClose>
          </Flex>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
};

export default Settings;
