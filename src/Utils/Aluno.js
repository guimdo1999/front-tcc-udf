import * as backEndUtils from "./BackEnd";

export const insertAluno = async (dados) => {
  const registrar_aluno = {
    nome_aluno: dados.nome_aluno,
    data_nascimento: dados.data_nascimento,
    sexo: dados.sexo,
    matricula: dados.matricula,
    id_turma: dados.id_turma,
    is_active: dados.is_active,
    telefone: dados.telefone,
    email: dados.email,
  };
  return await backEndUtils
    .chamarBackEnd("POST", "/api/aluno", registrar_aluno)
    .then((resposta) => {
      return resposta.json().then((data) => data);
    });
};

export const getAluno = async () => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno")
    .then((resposta) => {
      return resposta.data;
    });
};
export const getAlunoId = async (req) => {
  return await backEndUtils
    .chamarBackEnd("GET", "/api/aluno/" + req)
    .then((resposta) => {
      return resposta.data;
    });
};

export const putAlunoId = async (id, dados) => {
  const update_aluno = {
    nome_aluno: dados.nome_aluno,
    data_nascimento: dados.data_nascimento,
    sexo: dados.sexo,
    matricula: dados.matricula,
    id_turma: dados.id_turma,
    is_active: dados.is_active,
    telefone: dados.telefone,
    email: dados.email,
  };
  return await backEndUtils
    .chamarBackEnd("PUT", "/api/aluno/" + id, update_aluno)
    .then((resposta) => {
      return resposta.data;
    });
};

export const deleteAluno = async (id) => {
  return await backEndUtils
    .chamarBackEnd("DELETE", "/api/aluno/" + id)
    .then((resposta) => {
      return resposta.data;
    });
};

/* export const onSend = (values) => {
  values.data_nascimento = values.data_nascimento.toISOString().split("T")[0];

  putAlunoId(aluno.id_aluno, values).then(() => {
    alert(`Atualizado o aluno: ${values.nome_aluno}`);
  });
}; */
