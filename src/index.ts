import * as screen from "./screen";
import { Cgi } from "./cgi";

const account = "admin";
const password = "admin";
const baseURL = "http://192.168.2.1";

async function main() {
  const enableDhcp = await screen.getEnableCommand();
  const cgi = new Cgi(baseURL, account, password);

  screen.showProcess(enableDhcp);
  const result = await cgi.setDhcpEnable(enableDhcp);
  screen.showResult(result);
}

main()
  .catch((err) => console.error(err.message))
  .finally(async () => {
    await screen.sleep(600);
    process.exit(0);
  });
