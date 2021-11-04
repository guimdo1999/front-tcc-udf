import * as backEndUtils from "./BackEnd";

export const insertTurma = async (dados) => {
  const registrar_turma = {
    nome_turma: dados.nome_turma,
    ano_turma: dados.ano_turma,
    qtd_meses: dados.qtd_meses,
    tipo_de_calendario: dados.tipo_de_calendario,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/turma", registrar_turma)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
