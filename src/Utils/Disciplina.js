import * as backEndUtils from "./BackEnd";

export const insertDisciplina = async (dados) => {
  const registrar_disciplina = {
    nome_disciplina: dados.nome_disciplina,
    aula_exclusiva: dados.aula_exclusiva,
    qtd_carga_horaria: dados.qtd_carga_horaria,
    qtd_aulas: dados.qtd_aulas,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/disciplina", registrar_disciplina)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
