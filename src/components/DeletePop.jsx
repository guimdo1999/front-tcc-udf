import { Button, Popconfirm } from "antd";
import React, { useState } from "react";

function DeletePop({ deleteFunction }) {
  const [visiblePop, setVisiblePop] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
        Deletar
      </Button>
    </Popconfirm>
  );
}

export default DeletePop;
