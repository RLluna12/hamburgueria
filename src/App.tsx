import { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CheckoutForm } from './components/CheckoutForm';
import { useCart } from './hooks/useCart';
import { products } from './data/products';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCart();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
    clearCart();
  };

  const burgers = products.filter((p) => p.category === 'burger');
  const drinks = products.filter((p) => p.category === 'drink');
  const sides = products.filter((p) => p.category === 'side');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemCount={getItemCount()} onCartClick={() => setIsCartOpen(true)} />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl p-8 md:p-12 shadow-xl mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bem-vindo à Joias Elegância!
            </h2>
            <p className="text-lg md:text-xl text-pink-100 max-w-2xl">
              Joias exclusivas e sofisticadas para seus momentos especiais.
              Peças únicas em ouro, prata e pedras preciosas de qualidade premium.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💍</span>
            <h2 className="text-3xl font-bold text-gray-800">Anéis</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {burgers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">📿</span>
            <h2 className="text-3xl font-bold text-gray-800">Colares</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {drinks.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">✨</span>
            <h2 className="text-3xl font-bold text-gray-800">Brincos</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sides.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">💎</span>
            </div>
            <h3 className="text-xl font-bold">Joias Elegância</h3>
          </div>
          <p className="text-gray-400 mb-2">As mais belas peças de joias da cidade</p>
          <p className="text-gray-500 text-sm">
            Atendimento personalizado - Agende sua visita
          </p>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={getTotal()}
        onCheckout={handleCheckout}
      />

      <CheckoutForm
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        total={getTotal()}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}

export default App;
