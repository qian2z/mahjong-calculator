import {
  Button,
  DialogClose,
  DialogContent,
  DialogRoot,
  DialogTrigger,
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
import { BiDetail } from "react-icons/bi";
import { Score } from "../page";
import { FinalPlayer } from "./Results";

const CalculationDialog = ({
  players,
  extraScore,
}: {
  players: FinalPlayer[];
  extraScore: Score[];
}) => {
  return (
    <Flex>
      <DialogRoot>
        <DialogTrigger>
          <Button color="yellow" variant="classic">
            <BiDetail />
            Detail
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Flex gap="2" direction="column">
            <TableRoot>
              <TableHeader>
                <TableRow align="center">
                  <TableColumnHeaderCell justify="center"></TableColumnHeaderCell>
                  {players.map((p) => (
                    <TableColumnHeaderCell key={p.name} justify="center">
                      {p.name}
                    </TableColumnHeaderCell>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {players[0].round_score.map((s, i) => (
                  <TableRow key={i} align="center">
                    <TableRowHeaderCell justify="center">
                      <Text weight="bold">{`R${i}`}</Text>
                    </TableRowHeaderCell>
                    {players.map((p) => (
                      <TableCell key={`${p.name}${i}`} justify="center">
                        {p.round_score[i]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow align="center">
                  <TableRowHeaderCell></TableRowHeaderCell>
                  {players.map((p) => (
                    <TableCell key={p.name} justify="center">
                      <Text weight="bold">
                        {p.round_score.reduce((acc, curr) => acc + curr, 0)}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableRowHeaderCell></TableRowHeaderCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableRowHeaderCell></TableRowHeaderCell>
                  {extraScore.map((s) => (
                    <TableCell key={s.score} justify="center">
                      <Text weight="bold" color="green">
                        {s.title}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
                {players[0].score_detail.length !== 0 &&
                  [0, 1, 2].map((i) => (
                    <TableRow key={i} align="center">
                      <TableRowHeaderCell></TableRowHeaderCell>
                      {players.map((p) => (
                        <TableCell key={`${p.name}${i}`} justify="center">
                          {p.score_detail[i]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                <TableRow>
                  <TableRowHeaderCell></TableRowHeaderCell>
                  {extraScore.map((s) => (
                    <TableCell key={s.score} justify="center">
                      {s.score}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableRowHeaderCell>
                    <Text weight="bold">Total</Text>
                  </TableRowHeaderCell>
                  {players.map((p, i) => (
                    <TableCell key={p.name} justify="center">
                      <Text weight="bold" color="red">
                        {p.score_detail.reduce((acc, curr) => acc + curr, 0) +
                          extraScore[i].score}
                      </Text>
                    </TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </TableRoot>
            <Flex justify="end">
              <DialogClose>
                <Button variant="soft" color="gray">
                  Close
                </Button>
              </DialogClose>
            </Flex>
          </Flex>
        </DialogContent>
      </DialogRoot>
    </Flex>
  );
};

export default CalculationDialog;
