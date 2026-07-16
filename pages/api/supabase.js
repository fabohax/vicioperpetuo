import { supabase } from '@/utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, lastname, email, phone } = req.body;

    try {
      // Insertar los datos en Supabase
      const { data, error } = await supabase
        .from('vpvp_postus')
        .insert([{ name, lastname, email, phone }]);

      if (error) {
        return res.status(500).json({ error: 'Error al insertar en Supabase.' });
      }

      return res.status(200).json({ message: 'Datos enviados exitosamente a Supabase.' });
    } catch (error) {
      console.error('Server Error:', error);
      return res.status(500).json({ error: 'Error en el servidor.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido.' });
  }
}
