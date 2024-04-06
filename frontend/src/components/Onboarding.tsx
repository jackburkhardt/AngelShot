import { Chip } from "@mantine/core";
import { useState } from "react";

export function Onboarding({}) {
    const [chipAns,setChipAns] = useState("react")
  return (
    <div>
      <Chip.Group multiple={false} value={chipAns} onChange={setChipAns}>
      <Chip value="react">React</Chip>
      <Chip value="ng">Angular</Chip>
      <Chip value="svelte">Svelte</Chip>
      <Chip value="vue">Vue</Chip>
    </Chip.Group>
    </div>
  );
}
