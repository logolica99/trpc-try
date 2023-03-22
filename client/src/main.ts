import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";

import { AppRouter } from "../../server/api";

const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      headers: { Authorization: "TOKEN" },
    }),
  ],
});

async function main() {
  // const result = await client.sayHi.query();
  // const res = await client.logToServer.mutate("Hi from client");
  // const getUser = await client.users.getUser.query();
  // const getUser = await client.users.getUser.query({ userId: "1234" });
  // const updateUser = await client.users.update.mutate({
  //   userId: "1234",
  //   name: "gamer",
  // });

  const adminData = await client.secretData.query();

  console.log(adminData);
}

main();
