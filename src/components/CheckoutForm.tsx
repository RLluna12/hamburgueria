import { useState, FormEvent } from 'react';
import { X, Send, User, Phone, CreditCard, FileText } from 'lucide-react';
import { OrderForm, CartItem } from '../types';
import { formatPhone, normalizePhone } from '../utils/format';
import { generateWhatsAppLink } from '../utils/whatsapp';

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

export function CheckoutForm({
  isOpen,
  onClose,
  cartItems,
  total,
  onOrderComplete,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<OrderForm>({
    name: '',
    phone: '',
    paymentMethod: '',
    notes: '',
  });

  const handlePhoneChange = (value: string) => {
    const numbers = normalizePhone(value);
    if (numbers.length <= 11) {
      setFormData({ ...formData, phone: formatPhone(numbers) });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.paymentMethod) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const whatsappNumber = '5511937701183';
    const whatsappLink = generateWhatsAppLink(cartItems, formData, total, whatsappNumber);

    window.open(whatsappLink, '_blank');

    onOrderComplete();
    setFormData({ name: '', phone: '', paymentMethod: '', notes: '' });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 flex items-center justify-between rounded-t-xl sticky top-0">
            <h2 className="text-xl font-bold">Finalizar Pedido</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <User className="w-5 h-5 text-rose-600" />
                Nome completo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="Digite seu nome"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Phone className="w-5 h-5 text-rose-600" />
                Telefone *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <CreditCard className="w-5 h-5 text-rose-600" />
                Forma de Pagamento *
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all bg-white"
                required
              >
                <option value="">Selecione a forma de pagamento</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão de Débito">Cartão de Débito</option>
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="PIX">PIX</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <FileText className="w-5 h-5 text-rose-600" />
                Observações
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="Ex: Tamanho preferido, gravação especial, data desejada..."
                rows={4}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
              Enviar Pedido via WhatsApp
            </button>

            <p className="text-xs text-gray-500 text-center">
              * Campos obrigatórios
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
