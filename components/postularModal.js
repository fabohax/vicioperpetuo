import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PModal = ({ isOpen, onClose }) => {
  const router = useRouter();
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
      // Enviar datos a Supabase
      const supabaseResponse = await fetch('/api/supabase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (!supabaseResponse.ok) {
        throw new Error('Error al enviar los datos a Supabase.');
      }

      // Enviar correos electrónicos tanto al usuario como a los administradores
      const mailResponse = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          adminMails: ['fabohax@gmail.com', 'edicionesvicioperpetuo@gmail.com'], // Correos de los administradores
        }),
      });

      if (!mailResponse.ok) {
        throw new Error('Error al enviar los correos electrónicos.');
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
    <div className="custom-scrollbar fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-black rounded-lg pl-6 py-6 w-full max-w-md mx-4 border-[1px] border-[#333] text-[#fff] relative">
        <div className="overflow-y-auto max-h-[80vh] pr-6 custom-scrollbar">
          <form onSubmit={handleSub}>
            <h1 className="mt-8 spectral text-3xl">Publica con Nosotros</h1>

            <p>En Vicio Perpetuo Vicio Perfecto estamos comprometidos a impulsar las historias que nos impacten.</p>
            <p>Envíanos tu información y nos pondremos en contacto contigo.</p>
            <br />
            
            {/* Nombre */}
            <input
              type="text"
              name="name"
              className="px-2 py-4 w-full mb-4 border rounded-md bg-transparent"
              placeholder="Nombres"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            {/* Apellidos */}
            <input
              type="text"
              name="lastname"
              className="px-2 py-4 w-full mb-4 border rounded-md bg-transparent"
              placeholder="Apellidos"
              value={formData.lastname}
              onChange={handleInputChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              className="px-2 py-4 w-full mb-4 border rounded-md bg-transparent"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            {/* Teléfono */}
            <input
              type="tel"
              name="phone"
              className="px-2 py-4 w-full mb-4 border rounded-md bg-transparent"
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
              className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-red-900 transition"
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Postular'}
            </button>
            <p className="my-2 text-[#333] text-center">
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
