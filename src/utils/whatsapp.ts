import { CartItem, OrderForm } from '../types';
import { formatCurrency } from './format';

export function generateWhatsAppLink(
  cartItems: CartItem[],
  orderForm: OrderForm,
  total: number,
  whatsappNumber: string
): string {
  let message = `*NOVO PEDIDO*\n\n`;
  message += `*Cliente:* ${orderForm.name}\n`;
  message += `*Telefone:* ${orderForm.phone}\n`;
  message += `*Forma de Pagamento:* ${orderForm.paymentMethod}\n\n`;
  message += `*ITENS DO PEDIDO:*\n`;

  cartItems.forEach((item) => {
    message += `\n${item.quantity}x ${item.product.name}\n`;
    message += `${formatCurrency(item.product.price)} cada\n`;
    message += `Subtotal: ${formatCurrency(item.product.price * item.quantity)}\n`;
  });

  message += `\n*TOTAL: ${formatCurrency(total)}*\n`;

  if (orderForm.notes.trim()) {
    message += `\n*Observações:*\n${orderForm.notes}`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
}
