import React, { useEffect, useState } from 'react';
import DadoItem from './components/dadosItem';
import { getDados } from './api';
import loading from './assets/loading.gif';

const App: React.FC = () => {
  const [dados, setDados] = useState<IDado[]>([])

  useEffect(() => {
    fetchDados()
  }, [])

  const fetchDados = (): void => {
    getDados()
      .then(({ data: { dados } }: IDado[] | any) => setDados(dados))
      .catch((err: Error) => console.log(err))
  }

  if (Object.keys(dados).length === 0) {
    return (
      <main className='App'>
        <h1 className='titleH1' >Dados API Graphql GitHub <button onClick={() => { window.location.reload() }} className='refresh' >Refresh</button></h1>  
         
        <img src={loading} />     
      </main>
    )
  } else {
    return (
      <main className='App'>
        <h1 className='titleH1' >Dados API Graphql GitHub <button onClick={() => { window.location.reload() }} className='refresh' >Refresh</button></h1>
        
        {dados.map((dado: any) => (
          <DadoItem
            key={dado._id}
            dado={dado}
          />
        ))}
      </main>
    )
  }

  
}

export default App