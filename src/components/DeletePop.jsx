import { Button, Popconfirm } from "antd";
import React, { useState } from "react";

function DeletePop({ deleteFunction, titulo }) {
  const [visiblePop, setVisiblePop] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  if (!titulo) {
    titulo = "Deletar";
  }

  const mostrarPop = () => {
    setVisiblePop(true);
  };
  const handlePopCancel = () => {
    setVisiblePop(false);
  };

  return (
    <Popconfirm
      title="Deletar?"
      visible={visiblePop}
      okType="danger"
      okText="Deletar"
      okButtonProps={{ loading: confirmLoading }}
      onConfirm={() => {
        setConfirmLoading(true);

        deleteFunction();

        setConfirmLoading(false);
        setVisiblePop(false);
      }}
      onCancel={handlePopCancel}
      cancelText="Cancelar"
    >
      <Button
        type="primary"
        danger
        onClick={() => {
          mostrarPop();
        }}
      >
        {titulo}
      </Button>
    </Popconfirm>
  );
}

export default DeletePop;
