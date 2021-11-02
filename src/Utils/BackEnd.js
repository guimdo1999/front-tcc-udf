/* eslint-disable eqeqeq */
const linkBackEnd = process.env.REACT_APP_API_URL_DEV;

export const chamarBackEnd = async (metodo, caminho, corpo) => {
  let response;

  if (corpo) {
    response = await fetch(linkBackEnd + caminho, {
      method: metodo,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(corpo),
    });
  } else {
    response = await fetch(linkBackEnd + caminho, {
      method: metodo,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return response;
};
