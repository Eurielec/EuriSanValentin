import { BuzzFeedQuiz } from "react-buzzfeed-quiz";
import "react-buzzfeed-quiz/lib/styles.css";

var color0= "#ffffff",color1= "#f0a1a5", color2="#fec1b2", color3="#fe7f6c", color4="#fbc8d6";


const test = () => {
  return (
    <div className="buzzfeed-quiz">
    <BuzzFeedQuiz
      title={<h1 className="title" >¿Qué deberías regalarle a tu pareja por San Valentín?</h1>}
      description={<h2>Descúbrelo con este test de personalidad</h2>}
      autoScroll={true}
      onRestart={() => alert("¿Quieres volver a hacer el test?")}
      onAnswerSelection={(questionIndex, answerIndex, resultID) =>
        console.log({
          questionIndex,
          answerIndex,
          resultID,
        })
      }
      facebookShareButton={false}
      facebookShareLink={"www.yourlink.com"}
      twitterShareButton={false}
      twitterShareLink={"www.yourlink.com"}
      copyShareButton={false}
      copyShareLink={"This text was copied using the copyShareLink prop."}
      
    questions={[ 
        { question: "Elige tu team:",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          fontColor: color0,
          backgroundImageSrc: "/assets/test/Q1.jpg",
          
          answers: [{
              answer: "BIO",
              resultID: 0,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)"
            },
            {
              answer: "TELECO",
              resultID: 1,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "DATOS",
              resultID: 3,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "No sé, no voy a clase",
              resultID: 2,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "Elige una asignatura:",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q2.jpg",
          fontColor: color0,
          
          answers: [{
              answer: "MMAT",
              resultID: 0,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)"
            },
            {
              answer: "IACR",
              resultID: 1,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Fundamentos de Biomecánica",
              resultID: 2,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "INGLÉS",
              resultID: 3,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿Cuál es tú lugar favorito en la ETSIT?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q3.jpg",
          fontColor: color0,
          answers: [{
              answer: "Cafetería",
              resultID: 2,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Biblioteca",
              resultID: 1,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },
            {
                answer: "Puerta del A",
                resultID: 3,
                backgroundColor: color4,
                fontColor: "rgb(53,51,48)",
              },
            {
              answer: "Clubes",
              resultID: 0,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿Qué tal te ves en la carrera?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q4.jpg",
          fontColor: color0,
          
          answers: [{
              answer: "Acabo de entrar",
              resultID: 1,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Un 5.0 son 6 créditos",
              resultID: 3,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Mejor que en el amor",
              resultID: 0,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Me voy a Magisterio",
              resultID: 2,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿A quién le mandarias una piruleta?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q5.jpg",
          fontColor: color0,
          answers: [{
              answer: "Grajal",
              resultID: 0,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Nava",
              resultID: 3,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "A mi crush",
              resultID: 1,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Quique Cafeta",
              resultID: 2,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿Cuál es tu actividad favorita en la ETSIT?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q6.jpg",
          fontColor: color0,
          answers: [{
              answer: "Fumar",
              resultID: 3,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Ir al depor",
              resultID: 1,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Jugar al mus",
              resultID: 2,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Ir a clase",
              resultID: 0,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿Qué club es tu favorito?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q7.jpg",
          fontColor: color0,
          answers: [{
              answer: "Euri",
              resultID: 3,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Delta",
              resultID: 2,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "ECO  ",
              resultID: 0,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Depor",
              resultID: 1,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },],},

        {question: "¿Qué te gustaría que te regalasen por San Valentín?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q8.jpg",
          fontColor: color0,
          answers: [{
              answer: "Bombones",
              resultID: 2,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Flores",
              resultID: 1,
              backgroundColor: color1,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Piruletas",
              resultID: 3,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Pareja",
              resultID: 0,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },],},
        { question: "¿Cuál seria tu cita ideal en la ETSIT?",
          questionRelativeToImage: "overlap",
          answerArrangement: "tile",
          backgroundImageSrc: "/assets/test/Q9.jpg",
          fontColor: color0,
          answers: [{
              answer: "Fumarse un piti en la puerta del A",
              resultID: 3,
              backgroundColor: color1, 
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Ayudar a tu pareja con CELT",
              resultID: 0,
              backgroundColor: color2,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Tomarse algo en mesitas",
              resultID: 1,
              backgroundColor: color3,
              fontColor: "rgb(53,51,48)",
            },
            {
              answer: "Ciberteca & Chill",
              resultID: 2,
              backgroundColor: color4,
              fontColor: "rgb(53,51,48)",
            },],}
     ]}
     
      results={[
        {  //el tacaño/rata
          //description: Conseguir cubatas gratis de fiesta es tu pasatiempo favorito, tienes el arte de la seducción mas que dominado. Seamos honestos, el sueldo no te da ni para invitar a una cerve a tu crush y los pitis que le robas a tus amigos cada vez saben mejor.,
          resultImageSrc: "/assets/test/Result0.png",
          resultID: 0,
        },
        {  //El emprendedor                                                              
          //description: Te encanta buscar nuevas opciones y nuevas oportunidades en el amor, has tenido una época en la ETSIT donde el 3x2 de integra te ha salvado de muchas. Pretendes o pretendiste hacerte rico con el proyecto de empresa, no lo niegues,                                              
          resultImageSrc: "/assets/test/Result1.png",                              
          resultID: 1,                                                     
        },
        { 
           //Entregado en el amor
          //description: Eres una persona 10, igual que apruebas RDOR te entregas al amor. Andas en busca de alguien que no mienta principalmente pero siempre te estampas, no pierdes la fe aunque te osties.",
          resultImageSrc: "/assets/test/Result2.png",
          resultID: 2,
        },                                                               
        {  //El alternativo
          //description: "Te gusta arriesgar, y en el amor no iba a ser menos. ¿Quién quiere ir a la Tagliatella cuando puedes tener una cita superromántica en el museo del C? Cuidado!! Grajal estará mirando",
          resultImageSrc: "/assets/test/Result3.png",

          resultID: 3,
        },
      ]}
    />
    </div>
  );
};
export default test;