export function getWhatsAppNumber(): string {
  const raw =
    process.env.NEXT_PUBLIC_WA_NUMBER ??
    '5491169146371';
  return raw.replace(/[^0-9]/g, '');
}
