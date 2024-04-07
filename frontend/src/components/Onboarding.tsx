import { Chip, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import {
  Stack,
  ActionIcon,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import {
  IconChevronLeft,
  IconChevronRight,
  IconSend2,
} from "@tabler/icons-react";
import mainLogo from "./logo.png";
// import mainLogo from "./logo.png";

export function Onboarding({}) {
  const [what, setWhat] = useState("");
  const [who, setWho] = useState("");
  const [gender, setGender] = useState("");
  const [page, setPage] = useState(0);
  const [nextAccessible, setNextAccessible] = useState(true);

  useEffect(() => {
    if ((page===0 && what==="") || (page === 1 && who==="")
    || (page===2 && gender==="")) {
        setNextAccessible(false)
    } else {
        setNextAccessible(page<=2)
    }
  },[page,what,who,gender]);

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
          <Chip size="xl" value="rideshare">
            Using Rideshare
          </Chip>
          <Chip size="xl" value="walking">
            Walking Alone
          </Chip>
          <Chip size="xl" value="emergency">
            Family Emergency
          </Chip>
          <Chip size="xl" value="breakup">
            Friend breakup
          </Chip>
          {/* <Chip size="xl" value="other">
        Other:
      </Chip> */}
        </Chip.Group>
        <TextInput
          placeholder="Write custom situation"
          size="lg"
          rightSection={
            <ActionIcon onClick={() => nextPage()} size="lg" aria-label="backward">
              <IconSend2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
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
          <Chip size="xl" value="parent">
            Parent
          </Chip>
          <Chip size="xl" value="friend">
            Friend
          </Chip>
          <Chip size="xl" value="s_o">
            Significant Other
          </Chip>
        </Chip.Group>
        <TextInput
          placeholder="Write custom person"
          size="lg"
          rightSection={
            <ActionIcon onClick={() => nextPage()} size="lg" aria-label="backward">
              <IconSend2 style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
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
          <Chip size="xl" value="M">
            Male
          </Chip>
          <Chip size="xl" value="F">
            Female
          </Chip>
        </Chip.Group>
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
        {page === 0  ? (
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

      {{ 0: what_var, 1: who_var, 2: gender_var }[page]}
    </div>
  );
}
