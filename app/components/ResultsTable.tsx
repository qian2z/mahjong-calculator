import {
  Badge,
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
import { FaArrowRight } from "react-icons/fa";
import { FinalPlayer, Settlement } from "./Results";

interface Props {
  results: FinalPlayer[];
  settlement: Settlement[];
}

const ResultsTable = ({ results, settlement }: Props) => {
  return (
    <TableRoot size="3" variant="surface">
      <TableHeader>
        <TableRow align="center">
          <TableColumnHeaderCell justify="center">Player</TableColumnHeaderCell>
          <TableColumnHeaderCell justify="center">Points</TableColumnHeaderCell>
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
                    <Flex gap="2" align="center" justify="start" key={s.amount}>
                      <Text size="3" weight="bold" color="blue">
                        {s.amount}
                      </Text>
                      <FaArrowRight />
                      <Text size="2" weight="bold">
                        {s.payee.name}
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
  );
};

export default ResultsTable;
