import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  total: number;
  onCheckout: () => void;
}

export function Cart({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  total,
  onCheckout,
}: CartProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            Seu Carrinho
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Seu carrinho está vazio</p>
            <p className="text-gray-400 text-sm mt-2">
              Adicione itens deliciosos ao seu pedido
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gray-50 rounded-lg p-3 shadow-sm"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-rose-600 font-bold mt-1">
                        {formatCurrency(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 bg-rose-600 hover:bg-rose-700 text-white rounded flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 p-1 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="font-bold text-gray-800">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-rose-600">
                  {formatCurrency(total)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
