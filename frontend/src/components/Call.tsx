import { Stack, Button } from "@mantine/core";

export function Call() {
  return (
    <Stack justify="space-between" h={"100%"}>
      <a href="tel:911">
        <Button w={"100%"} size="lg">
          Call 911
        </Button>
      </a>

      <Button size="lg" color="red" onClick={() => window.location.reload()}>
        Hang up
      </Button>
      <div></div>
    </Stack>
  );
}
