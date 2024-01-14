export const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, handler: () => void) => {
  if (event.code === 'Enter') {
    handler();
  }
};