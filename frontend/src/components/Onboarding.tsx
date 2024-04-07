import { Chip } from "@mantine/core";
import { useState } from "react";

export function Onboarding({}) {
  const [chipAns, setChipAns] = useState("react");
  return (
    <div>
      <Chip.Group multiple={false} value={chipAns} onChange={setChipAns}>
        <Chip value="rideshare">Using rideshare</Chip>
        <Chip value="walking">Walking alone</Chip>
        <Chip value="emergency">Family Medical Emergency</Chip>
        <Chip value="breakup">Friend breakup</Chip>
        <Chip value="other">Other</Chip>
      </Chip.Group>
    </div>
  );
}
