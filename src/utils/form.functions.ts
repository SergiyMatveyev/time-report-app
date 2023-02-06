export function validateText(text: string): boolean {
  return text.trim() !== '';
}

export function validatePassword(password: string): boolean {
  return password.trim().length > 6;
}

export function isValidSpendTime(time: string): { message: string } | null {
  let response: { message: string } | null = null;
  const parts = time.toLowerCase().split(' ');
  parts.forEach(t => {
    if (!/^\d{1,2}[dhms]$/.test(t)) {
      response = { message: 'Incorrect time report format' };
    }
  });
  return response;
}
