import * as backEndUtils from "./BackEnd";

export const updateConfig = async (dados) => {
  const update_config = {
    qtd_max_aulas: dados.qtd_max_aulas,
    exibir_percentual: dados.exibir_percentual,
    per_dois_professores: dados.per_dois_professores,
    per_carga_hor_superior: dados.per_carga_hor_superior,
    desativar_turmas_janeiro: dados.desativar_turmas_janeiro,
    desativar_turma_jul: dados.desativar_turma_jul,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/config/1", update_config)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getConfigId = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", `/api/config`)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
