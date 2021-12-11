import * as backEndUtils from "./BackEnd";

export const insertGrade = async (dados) => {
  const registrar_grade = {
    fk_aula: dados.fk_aula,
    fk_horario: dados.fk_horario,
    fk_turma: dados.fk_turma,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/grade", registrar_grade)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};
export const generateGrade = async (id) => {
  const gerar_grade = {
    id_turma: id,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/grade/generate/", gerar_grade)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getGrade = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/grade")
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const getGradeId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/grade/" + req)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};

export const putGradeId = async (id, dados) => {
  const update_grade = {
    fk_aula: dados.fk_aula,
    fk_horario: dados.fk_horario,
    fk_turma: dados.fk_turma,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/grade/" + id, update_grade)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const deleteGrade = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/grade/" + id)
    .then((resposta) => {
      return resposta.json().then((data) => data.data);
    });
};
