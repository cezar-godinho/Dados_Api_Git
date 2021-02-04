import React from 'react'

type Props = DadoProps & {
}

const Dado: React.FC<Props> = ({ dado }) => {
  return (
    <div className='Card'>
      <div className='Card--text'>
        <h1>{dado.nome}</h1>
        <p>Inserts: <span className=''>{dado.inserts}</span></p>
        <p>Delets: <span className=''>{dado.deletions}</span></p>
        <p>Commits: <span className=''>{dado.commits}</span></p>
      </div>
      
    </div>
  )
}

export default Dado