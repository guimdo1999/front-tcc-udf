import * as backEndUtils from "./BackEnd";

export const insertAluno = async (dados) => {
  const registrar_aluno = {
    nome_aluno: dados.nome_aluno,
    data_nascimento: dados.data_nascimento,
    sexo: dados.sexo,
    matricula: dados.matricula,
    telefone: dados.telefone,
    email: dados.email,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aluno", registrar_aluno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
