export const waitForUserConfirmation = ({
  popup,
  confirmResult,
}: {
  popup: boolean;
  confirmResult: boolean | undefined;
}): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    if (confirmResult) resolve(true);
    else resolve(false);
  });
};
