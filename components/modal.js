import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import PhoneCountrySelect, { COUNTRIES } from './PhoneCountrySelect';

const DeliveryLocationPicker = dynamic(() => import('./DeliveryLocationPicker'), {
  ssr: false,
  loading: () => (
    <div className="mb-4 rounded-lg border border-[#333] bg-[#080808] p-3 text-sm text-[#ddd]">
      Cargando mapa...
    </div>
  ),
});

const Modal = ({ isOpen, onClose, bookTitle, bookPrice, bookAuthor }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    phoneCountry: COUNTRIES[0],
    txid: '',
    book: bookTitle,
    honeypot: '',
    deliveryLocation: {
      address: '',
      lat: null,
      lng: null,
      placeId: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentButtonClasses = (method) => {
    const isSelected = paymentMethod === method;
    return `w-full hover:bg-[#f5f5f5] hover:text-black focus:text-black px-4 py-4 rounded-2xl border-[#333] border-[1px] mx-1 ${
      isSelected ? 'bg-[#f5f5f5] !text-black' : 'bg-black text-white'
    }`;
  };

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!paymentMethod) {
      setError('Por favor selecciona un método de pago.');
      return;
    }

    if (!formData.phone.trim()) {
      setError('Por favor ingresa tu número telefónico.');
      return;
    }

    if (!formData.deliveryLocation.address || !formData.deliveryLocation.lat || !formData.deliveryLocation.lng) {
      setError('Por favor agrega una dirección de entrega y marca el punto en el mapa.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          phone: `${formData.phoneCountry.dialCode} ${formData.phone.trim()}`.trim(),
          paymentMethod,  // Include selected payment method
          bookTitle,      // Include book title
          bookAuthor,     // Include book author
          bookPrice,      // Include book price
        }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (error) {
        console.error('Error parsing order response:', error);
      }

      if (response.ok) {
        router.push('/hecho');
      } else {
        setError(result?.error || 'No pudimos enviar el pedido. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('No pudimos conectar con el servidor. Revisa tu conexión e inténtalo otra vez.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black rounded-lg pl-6 py-6 w-full max-w-md mx-4 border-[1px] border-[#333] text-[#fff] relative">
        <div className="overflow-y-auto max-h-[80vh] pr-6 custom-scrollbar">
          <form onSubmit={handleSub}>
            <p>Comprar</p>
            <h1 className="mt-8 spectral text-3xl">{bookTitle}</h1>
            <h3>de {bookAuthor}</h3>
            <p className="my-8">Precio: {bookPrice} PEN</p>

            {/* Payment Method Buttons */}
            <div className="flex flex-row justify-around my-4">
              <button
                type="button"
                onClick={() => handlePaymentSelection('Yape')}
                className={paymentButtonClasses('Yape')}
              >
                Yape
              </button>
              <button
                type="button"
                onClick={() => handlePaymentSelection('Plin')}
                className={paymentButtonClasses('Plin')}
              >
                Plin
              </button>
              <button
                type="button"
                onClick={() => handlePaymentSelection('Bitcoin')}
                className={paymentButtonClasses('Bitcoin')}
              >
                Bitcoin
              </button>
            </div>

            {/* Show QR code and instructions based on selected payment method */}
            {paymentMethod && (
              <div className="my-8 text-center">
                {paymentMethod === 'Yape' && (
                  <div>
                    <Image
                      src="/qrs/yape-qr.svg"
                      alt="QR para Yape"
                      width={150}
                      height={150}
                      className="mx-auto"
                      style={{ width: "150px", height: "auto" }}
                    />
                    <p className="my-2">Pagar a este número <strong>+51 929 297 202</strong><br /> y capturar pantalla</p>
                  </div>
                )}
                {paymentMethod === 'Plin' && (
                  <div>
                    <Image
                      src="/qrs/plin-qr.svg"
                      alt="QR para Plin"
                      width={150}
                      height={150}
                      className="mx-auto"
                      style={{ width: "150px", height: "auto" }}
                    />
                    <p className="my-2">Pagar a este número <strong>+51 929 297 202</strong><br /> y capturar pantalla</p>
                  </div>
                )}
                {paymentMethod === 'Bitcoin' && (
                  <div>
                    <Image
                      src="/qrs/bitcoin-qr.png"
                      alt="QR para Bitcoin"
                      width={150}
                      height={150}
                      className="mx-auto"
                      style={{ width: "150px", height: "auto" }}
                    />
                    <p className="my-2">Pagar a esta dirección <strong className="text-sm break-words bg-[#111] px-2 py-2 block rounded-md">bc1qqm3yk9v5wn55rg8wc5klcathqvurvpjtpeutjc</strong> e ingresar TXID</p>
                    <input
                      name="txid"
                      type="text"
                      placeholder="TXID"
                      value={formData.txid}
                      onChange={handleInputChange}
                      className="bg-black text-white hover:text-white px-4 py-4 rounded-lg hover:bg-black border-[#333] border-[1px] w-full"
                      disabled={loading}
                    />
                  </div>
                )}
              </div>
            )}

            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-black text-white hover:text-white px-4 py-4 rounded-lg hover:bg-black border-[#333] border-[1px] w-full mb-4"
              disabled={loading}
            />

            <div className="flex items-stretch gap-2">
              <PhoneCountrySelect
                value={formData.phoneCountry}
                onChange={(phoneCountry) => setFormData((prevState) => ({ ...prevState, phoneCountry }))}
                disabled={loading}
              />
              <input
                name="phone"
                type="tel"
                placeholder="Número telefónico"
                value={formData.phone}
                onChange={handleInputChange}
                className="mb-4 min-w-0 flex-1 rounded-lg border border-[#333] bg-black px-4 py-4 text-white hover:bg-black hover:text-white"
                disabled={loading}
              />
            </div>

            <DeliveryLocationPicker
              value={formData.deliveryLocation}
              onChange={(deliveryLocation) => setFormData((prevState) => ({ ...prevState, deliveryLocation }))}
              disabled={loading}
            />

            {/* Honeypot field */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleInputChange}
              className="hidden"
            />

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Submit Button */}
            <button
              className="hover:bg-[#f5f5f5] text-white hover:text-black px-4 py-4 rounded-2xl border-[#333] border-[1px] w-full mb-4"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Ordenando...' : 'Ordenar'}
            </button>

            {/* Close Button */}
            <button
              className="bg-black text-white hover:text-white px-4 py-2 hover:underline hover:bg-black w-full"
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cerrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
