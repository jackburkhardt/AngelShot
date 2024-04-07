import { Chip } from "@mantine/core";
import { useState } from "react";
import { Stack } from '@mantine/core';

export function Onboarding({}) {
  const [value, setValue] = useState('react');
  const [page, setPage] = useState(0);

  const what_var = <Chip.Group multiple={false} value={value} onChange={setValue}>
                <Chip value="Rideshare">Rideshare</Chip>
                <Chip value="Walking">Walking</Chip>
                <Chip value="Excuse">Excuse</Chip>
              </Chip.Group> 

  const who_var = <Chip.Group multiple={false} value={value} onChange={setValue}>
                <Chip value="Parent">React</Chip>
                <Chip value="Friend">Angular</Chip>
                <Chip value="S_O">Svelte</Chip>
                </Chip.Group> 

  const gender_var = <Chip.Group multiple={false} value={value} onChange={setValue}>
                <Chip value="M">React</Chip>
                <Chip value="F">Angular</Chip>
                </Chip.Group> 

  function nextPage() {
    setPage(page + 1);
  }
  function prevPage() {
    setPage(page - 1);
  }
  

  return (
    <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="stretch"
      gap="lg"
    >
      {{0 : what_var,
        1 : who_var,
        2 : gender_var}[page]}
    </Stack>
  );
}
