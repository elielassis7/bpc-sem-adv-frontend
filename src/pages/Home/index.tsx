import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { DeductionCalculator } from "./components/DeductionCalculator";
import { InformativeContent } from "./components/informativeContent";


export function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-20 bg-blue-200">
      <Header />
      <main className="flex-grow p-4 ">
        <div className="my-10 mx-52 flex-1 h-96 border-yellow-400 border-2">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/BJFY_8PYh2A?si=HJ2qlI-ribjdyFpY"
            title="YouTube video player"
            allow="accelerometer; 
            autoplay; 
            clipboard-write; 
            encrypted-media; 
            gyroscope; 
            picture-in-picture; 
            web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        <InformativeContent />
        <DeductionCalculator />


        <p className="mx-20">

          Apresento a você o curso BPC sem advogado. Nele, você aprenderá:
          <br />
          &bull; Como juntar a documentação necessária;
          <br />
          &bull; Como dar entrada no processo;
          <br />
          &bull; Como fazer o acompanhamento;
          <br />
          &bull; Principais negativas do INSS e como resolver;
          <br />
          &bull; Como receber o benefício.
          <br />
          <br />
          Não deixe que o desconhecimento o leve a gastar dinheiro desnecessário. Inscreva-se no curso BPC sem advogado e conquiste o benefício que você e sua família merecem, de forma simples e econômica.

        </p>
      </main>
      <Footer />
    </div>

  )
}