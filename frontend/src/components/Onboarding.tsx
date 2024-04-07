import { useState, useEffect } from "react";
import {
  Chip,
  TextInput,
  Stack,
  ActionIcon,
  Group,
  Image,
  Space,
  Button,
  Title,
  Table,
  Text,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSend2,
} from "@tabler/icons-react";

interface OnboardingProps {
  setProcess: (process: string) => void;
  what: string;
  who: string;
  gender: string;
  setWhat: (what: string) => void;
  setWho: (who: string) => void;
  setGender: (gender: string) => void;
}

export function Onboarding({
  setProcess,
  what,
  who,
  gender,
  setWhat,
  setWho,
  setGender,
}: OnboardingProps) {
  const [page, setPage] = useState(0);
  const [nextAccessible, setNextAccessible] = useState(true);
  const [customSituation, setCustomSituation] = useState("");
  const [customPerson, setCustomPerson] = useState("");

  useEffect(() => {
    if (customSituation !== "") {
      setWhat(customSituation);
    }
  }, [customSituation]);

  useEffect(() => {
    if (customPerson !== "") {
      setWho(customPerson);
    }
  }, [customPerson]);

  useEffect(() => {
    if (
      (page === 0 && what === "") ||
      (page === 1 && who === "") ||
      (page === 2 && gender === "")
    ) {
      setNextAccessible(false);
    } else {
      setNextAccessible(page <= 2);
    }
  }, [page, what, who, gender]);

  const nextPageWhat = () => {
    console.log("NextPageWhat");
    console.log(what);
    setCustomSituation("");
    nextPage();
  };
  const nextPageWho = () => {
    console.log("NextPageWho");
    console.log(who);
    setCustomPerson("");
    nextPage();
  };

  const what_var = (
    <div>
      <Title>What is your call about?</Title>
      <Space h="xl" />
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        gap="lg"
        className="content"
      >
        <Chip.Group multiple={false} value={what} onChange={setWhat}>
          <Chip
            className="chip"
            onClick={() => nextPageWhat()}
            size="xl"
            value="Using Rideshare"
            radius={"300px"}
          >
            Using Rideshare
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPageWhat()}
            size="xl"
            value="Walking Alone"
            style={{ width: "300px" }}
          >
            Walking Alone
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPageWhat()}
            size="xl"
            value="Family Emergency"
          >
            Family Emergency
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPageWhat()}
            size="xl"
            value="Friend Breakup"
          >
            Friend breakup
          </Chip>
          {/* <Chip size="xl" value="other">
        Other:
      </Chip> */}
        </Chip.Group>
        <TextInput
          value={customSituation}
          placeholder="Write custom situation"
          size="lg"
          onChange={(event) => setCustomSituation(event.currentTarget.value)}
          rightSection={
            customSituation === "" ? (
              <ActionIcon
                disabled
                onClick={() => nextPage()}
                size="lg"
                aria-label="backward"
              >
                <IconSend2
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                onClick={() => nextPage()}
                size="lg"
                aria-label="backward"
              >
                <IconSend2
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            )
          }
        />
      </Stack>
    </div>
  );

  const who_var = (
    <div>
      <Title>Who's calling you?</Title>
      <Space h="xl" />
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        gap="lg"
        className="content"
      >
        <Chip.Group multiple={false} value={who} onChange={setWho}>
          <Chip
            className="chip"
            onClick={() => nextPageWho()}
            size="xl"
            value="Parent"
          >
            Parent
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPageWho()}
            size="xl"
            value="Friend"
          >
            Friend
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPageWho()}
            size="xl"
            value="Significant Other"
          >
            Significant Other
          </Chip>
        </Chip.Group>
        <TextInput
          value={customPerson}
          placeholder="Write custom person"
          size="lg"
          onChange={(event) => setCustomPerson(event.currentTarget.value)}
          rightSection={
            customPerson === "" ? (
              <ActionIcon
                onClick={() => nextPage()}
                disabled
                size="lg"
                aria-label="backward"
              >
                <IconSend2
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            ) : (
              <ActionIcon
                onClick={() => nextPage()}
                size="lg"
                aria-label="backward"
              >
                <IconSend2
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            )
          }
        />
      </Stack>
    </div>
  );

  const gender_var = (
    <div>
      <Title>What is their gender? *fix*</Title>
      <Space h="xl" />
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        gap="lg"
        className="content"
      >
        <Chip.Group multiple={false} value={gender} onChange={setGender}>
          <Chip
            className="chip"
            onClick={() => nextPage()}
            size="xl"
            value="Male"
          >
            Male
          </Chip>
          <Chip
            className="chip"
            onClick={() => nextPage()}
            size="xl"
            value="Female"
          >
            Female
          </Chip>
        </Chip.Group>
        <Text c="main_blue.7" style={{fontSize:"12px"}}>  
        Angel Shot™ acknowledges and affirms that gender identity
          is expanive and diverse. At this time, however, we are limited to a 
          binary set of voices for the purpose of this application.
        </Text>
      </Stack>
    </div>
  );

  const make_call = (
    <div>
      <Title>Ready to call?</Title>
      <Space h="xl" />
      <Stack
        h={300}
        bg="var(--mantine-color-body)"
        align="stretch"
        gap="lg"
        className="content"
      >
        <Table>
          <Table.Tr></Table.Tr>
          <Table.Tr>
            <Table.Th>Calling about</Table.Th>
            <Table.Td>{what}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>With</Table.Th>
            <Table.Td>{who}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Gender</Table.Th>
            <Table.Td>{gender}</Table.Td>
          </Table.Tr>
        </Table>
        <Button
          onClick={() => setProcess("call")}
          size="xl"
          style={{ padding: "1px", fontSize: "28px", borderWidth: "2.5px"}}
          h={"150px"}
          w={"150px"}
          radius={"50%"}
          variant="outline"
          justify="center"
          m="auto"
        >
          Call me
        </Button>
      </Stack>
    </div>
  );

  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    setPage(page - 1);
  }

  return (
    <div>
      <Group justify="space-between" gap="xs">
        {page === 0 ? (
          <ActionIcon
            disabled
            onClick={() => prevPage()}
            variant="subtle"
            size="xl"
            aria-label="backward"
          >
            <IconChevronLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        ) : (
          <ActionIcon
            onClick={() => prevPage()}
            variant="subtle"
            size="xl"
            aria-label="backward"
          >
            <IconChevronLeft
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        )}
        <Image w="200px" radius="md" src="/logo.png" />
        {nextAccessible ? (
          <ActionIcon
            onClick={() => nextPage()}
            variant="subtle"
            size="xl"
            aria-label="forward"
          >
            <IconChevronRight
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        ) : (
          <ActionIcon
            disabled
            onClick={() => nextPage()}
            variant="subtle"
            size="xl"
            aria-label="forward"
          >
            <IconChevronRight
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        )}
      </Group>
      <Space h="xl" />

      {{ 0: what_var, 1: who_var, 2: gender_var, 3: make_call }[page]}
    </div>
  );
}
