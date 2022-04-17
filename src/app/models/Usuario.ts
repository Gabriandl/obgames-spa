export interface Usuario {
    id?: string
    nomeCompleto: string;
    username: string;
    dataNasc: string;
    estado: string;
    pais: string;
    senha: string;
    dataCriacao?: string;
    timestamp?: BigInteger;
    roles?: string[]
  }