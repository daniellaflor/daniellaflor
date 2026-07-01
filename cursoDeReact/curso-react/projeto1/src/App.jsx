import Titulo from "./Titulo"

// Componente/ função

// function App(){
//   return <h1> Olá Mundo!</h1>
//   return <Titulo/>
// }

// quando quiser usar duas tags precisa utilizar <div>

function App(){
  return (
    <div>
      <Titulo/><Titulo/>
    </div>
  )
}

// Exportando o app pra fora
export default App