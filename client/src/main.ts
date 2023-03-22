import {
  createTRPCProxyClient,
  httpBatchLink,
  createWSClient,
  splitLink,
  wsLink,
} from "@trpc/client";

import { AppRouter } from "../../server/api";

const wsClient = createWSClient({ url: "ws://localhost:3000/trpc" });

const client = createTRPCProxyClient<AppRouter>({
  links: [
    splitLink({
      condition: (op) => {
        return op.type === "subscription";
      },
      true: wsLink({ client: wsClient }),
      false: httpBatchLink({
        url: "http://localhost:3000/trpc",
        headers: { Authorization: "TOKEN" },
      }),
    }),
  ],
});

document.addEventListener("click", () => {
  client.users.update.mutate({ userId: "1", name: "Kyle" });
});

async function main() {
  client.users.onUpdate.subscribe(undefined, {
    onData: (id) => {
      console.log("updated", id);
    },
  });
}

main();
