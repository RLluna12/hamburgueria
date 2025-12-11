import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ cartItemCount, onCartClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-3xl">🍔</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Burger House</h1>
              <p className="text-sm text-orange-100 hidden sm:block">
                Os melhores hambúrgueres da cidade
              </p>
            </div>
          </div>
          <button
            onClick={onCartClick}
            className="relative bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2 shadow-md"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
