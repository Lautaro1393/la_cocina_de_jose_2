import type { CartLine, CheckoutInfo } from '@/types/menu';
import { getWhatsAppNumber } from './whatsapp';

const arsFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
});

export function formatARS(value: number): string {
  return arsFormatter.format(value);
}

export function buildWhatsAppUrl(
  cart: CartLine[],
  info: CheckoutInfo,
): string {
  const lines = cart
    .map(
      (line) =>
        `- ${line.qty} ${line.dish.name} (${formatARS(line.dish.price * line.qty)})`,
    )
    .join('\n');

  const total = cart.reduce((acc, l) => acc + l.dish.price * l.qty, 0);

  const notesBlock = info.notes?.trim()
    ? `\n\nAclaraciones: ${info.notes.trim()}`
    : '';

  const text =
    `Hola soy ${info.name} y quiero ordenar:\n` +
    `${lines}\n\n` +
    `Total: ${formatARS(total)}\n` +
    `Pago en ${info.payment} y retiro en el local.${notesBlock}`;

  const number = getWhatsAppNumber();
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
