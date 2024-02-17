import { Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 h-14 py-2">
      <Flex justify="center" align="center" width="100%" height="100%" gap="2">
        <img
          src="../mahjong.png"
          alt="Mahjong Icon"
          className="max-w-full max-h-full"
        />
        <Text weight="bold" size="7">
          Calculator
        </Text>
      </Flex>
    </nav>
  );
};

export default NavBar;
