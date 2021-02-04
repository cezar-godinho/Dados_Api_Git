interface IDado {
    _id: number
    nome: string
    inserts: number
    deletions: number
    commits: number
  }
  
  interface DadoProps {
    dado: IDado
  }
  
  type ApiDataType = {
    nome: string
    inserts: number
    deletions: number
    commits: number
    dados: IDado[]
    dado?: IDado
  }