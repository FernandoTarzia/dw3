const db = require("../../../database/databaseconfig");

// Buscar todos os pedidos
const getAllPedidos = async () => {
  return (
    await db.query(
      "SELECT * FROM pedidos WHERE deleted = false ORDER BY pedidoid ASC"
    )
  ).rows;
};

// Buscar pedido por ID
const getPedidoByID = async (pedidoIDPar) => {
  return (
    await db.query(
      "SELECT * FROM pedidos WHERE pedidoid = $1 AND deleted = false ORDER BY pedidoid ASC",
      [pedidoIDPar]
    )
  ).rows;
};

// Inserir novo pedido
const insertPedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pedidos VALUES(default, $1, $2, $3, $4, $5)",
        [
          pedidoREGPar.clienteid,
          pedidoREGPar.valor,
          pedidoREGPar.data,
          pedidoREGPar.ativo,
          pedidoREGPar.deleted ?? false, // se não for passado, default = false
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|insertPedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Atualizar pedido existente
const updatePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pedidos SET " +
          "clienteid = $2, " +
          "valor = $3, " +
          "data = $4, " +
          "ativo = $5, " +
          "deleted = $6 " +
          "WHERE pedidoid = $1",
        [
          pedidoREGPar.pedidoid,
          pedidoREGPar.clienteid,
          pedidoREGPar.valor,
          pedidoREGPar.data,
          pedidoREGPar.ativo,
          pedidoREGPar.deleted,
        ]
      )
    ).rowCount;
  } 
  catch (error) {
    msg = "[mdlPedidos|updatePedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// Exclusão lógica (marcar como deleted)
const deletePedidos = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pedidos SET deleted = true WHERE pedidoid = $1",
        [pedidoREGPar.pedidoid]
      )
    ).rowCount;
  } 
  catch (error) {
    msg = "[mdlPedidos|deletePedidos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};