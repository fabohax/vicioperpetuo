import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const PModal = ({ isOpen, onClose }) => {
  const router = useRouter();
  const inputClassName = "px-2 py-4 w-full mb-4 rounded-md border border-[#555] bg-transparent text-white outline-none ring-0 placeholder:text-[#9ca3af] focus:border-[#555] focus:outline-none focus:ring-0 focus-visible:border-[#555] focus-visible:outline-none focus-visible:ring-0";
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    honeypot: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSub = async (e) => {
    e.preventDefault();

    // Validar email
    if (!validateEmail(formData.email)) {
      setError('Por favor ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const applyResponse = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          honeypot: formData.honeypot,
        }),
      });

      const result = await applyResponse.json().catch(() => ({}));

      if (!applyResponse.ok || result.success === false) {
        throw new Error(result.error || 'Error al enviar la postulación.');
      }

      // Redirigir a la página de éxito
      router.push('/recibido');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Ocurrió un error. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="custom-scrollbar fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[2147483647]"
      onClick={onClose}
    >
      <div
        className="bg-black rounded-lg pl-6 py-6 w-full max-w-md mx-4 border-[1px] border-[#333] text-[#fff] relative"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#555] text-xl leading-none text-white hover:bg-white hover:text-black focus:border-[#555] focus:outline-none"
        >
          ×
        </button>
        <div className="overflow-y-auto max-h-[80vh] pr-6 custom-scrollbar">
          <form onSubmit={handleSub}>
            <Image
              src="/pen.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
              className="mt-2 mb-4"
              style={{ width: "48px", height: "auto" }}
            />
            <h1 className="spectral text-3xl">Publica con Nosotros</h1>
<br/>
            <p>En Vicio Perpetuo Vicio Perfecto estamos comprometidos a impulsar las historias que nos impacten.</p>
            <br/><p>Envíanos tu información y nos pondremos en contacto contigo.</p>
            <br />
            
            {/* Nombre */}
            <input
              type="text"
              name="name"
              className={inputClassName}
              placeholder="Nombres"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            {/* Apellidos */}
            <input
              type="text"
              name="lastname"
              className={inputClassName}
              placeholder="Apellidos"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              className={inputClassName}
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Teléfono */}
            <input
              type="tel"
              name="phone"
              className={inputClassName}
              placeholder="Número de Teléfono"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            {/* Honeypot (Campo oculto para prevenir bots) */}
            <input
              type="text"
              name="honeypot"
              className="hidden"
              value={formData.honeypot}
              onChange={handleInputChange}
            />

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full py-4 bg-white text-black rounded-md hover:bg-white hover:text-black transition"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Postular'}
            </button>
            <p className="my-2 text-[#fff] text-center">
              <Link href="/tienda">Tienda</Link> | <Link href="/autores">Autores</Link> | <Link href="/nosotros">Nosotros</Link>
            </p>

            {/* Error */}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PModal;
