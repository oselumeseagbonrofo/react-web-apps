import fs from "node:fs/promises";
import ClientDemo from "@/components/ClientDemo";
import RSCDemo from "@/components/RSCDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import ServerActionsDemo from "@/components/ServerActionsDemo";
import UsePromiseDemo from "@/components/UsePromisesDemo";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default async function Home() {
  const fetchUsersPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try{
      const data = await fs.readFile("dummy-db.json", "utf-8");
      const users = JSON.parse(data);
      resolve(users);
      }catch(error){
        reject(error);
      }
    }, 2000);
  });

  new Promise(() => {});
  return (
    <main>
      <ErrorBoundary fallback={"Something went wrong!"}>
        <Suspense fallback={<p>Loading Data...</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
      <ServerActionsDemo />
    </main>
  );
}
