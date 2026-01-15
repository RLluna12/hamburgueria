import { Plus } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/format';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-600">
            {formatCurrency(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
