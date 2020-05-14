import inquirer from "inquirer";

export const getEnableCommand = async (): Promise<boolean> => {
  let enable: null | number = null;

  const enableCmd = process.argv.find((str) => str.startsWith("--enable="));
  if (enableCmd) {
    enable = parseInt(enableCmd.split("--enable=")[1]);
  }

  if (enable === null) {
    enable = await queryQuestion();
  }

  return Boolean(enable);
};

export const queryQuestion = async (): Promise<number> => {
  const answer = await inquirer.prompt({
    type: "list",
    message: "What do you want to do?",
    choices: [
      { name: "Enable DHCP", value: 1 },
      { name: "Disable DHCP", value: 0 },
    ],
    name: "result",
  });
  return answer.result;
};

export const showProcess = (enable: boolean) => {
  if (enable) {
    console.log("Enabling DHCP server...");
  } else {
    console.log("Disabling DHCP server...");
  }
};

export const showResult = (success: boolean) => {
  if (success) {
    console.log("\nSuccess");
  } else {
    console.log("\nFailed");
  }
};

export const sleep = (millsec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, millsec));

export const exit = () => {
  console.log("\nPress any key to exit...");
  process.stdin.setRawMode(true);
  process.stdin.resume();
  process.stdin.on("data", process.exit.bind(process, 0));
};
