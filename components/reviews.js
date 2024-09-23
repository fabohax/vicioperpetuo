// components/Marquee.js
import Marquee from "react-fast-marquee";
import styles from './reviews.module.css';

const Reviews = () => {
  
  return (
    <div className="marquee text-[12px] mx-auto top-[21px] py-8 text-[#777]justify-center items-center w-full text-center z-100">  
        <Marquee speed="100">
          <div className="marquee-content text-white text-lg">
            <span>--- Jahir Ríos: &quot;He comprado libros varias veces en Vicio Perpetuo y siempre he tenido una experiencia satisfactoria. Los precios son excelentes, hay muchas opciones de pago y los libros los recibí casi inmediatamente.&quot;</span>
            &nbsp;
            <span>--- Gabriela Olivera: &quot;Como compradora de Vicio Perpetuo, mi experiencia fue excelente. Compré una selección de libros nuevos para mi familia y quedé impresionada con la variedad de opciones de alta calidad y los precios competitivos. Recomiendo altamente a Vicio Perpetuo Vicio Perfecto como una fuente confiable para adquirir buenos libros.&quot;</span>
            &nbsp;
            <span>--- Manuel Gutarra: &quot;VicioPerpetuo tiene una gran selección de títulos e incluso organizan eventos constantemente.&quot;</span>
            &nbsp;
          </div>
        </Marquee>  
    </div>
  );
};

export default Reviews;
