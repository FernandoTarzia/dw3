const mdlPedidos = require("../model/mdlPedidos");

const getAllPedidos = (req, res) =>
  (async () => {
    let registro = await mdlPedidos.getAllPedidos();
    res.json({ status: "ok", registro });
  })();

const getPedidoByID = (req, res) =>
  (async () => {
    const pedidoID = parseInt(req.body.pedidoid);
    let registro = await mdlPedidos.getPedidoByID(pedidoID);
    res.json({ status: "ok", registro });
  })();

const insertPedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.insertPedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas });
  })();

const updatePedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.updatePedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas });
  })();

const deletePedidos = (req, res) =>
  (async () => {
    const pedidoREG = req.body;
    let { msg, linhasAfetadas } = await mdlPedidos.deletePedidos(pedidoREG);
    res.json({ status: msg, linhasAfetadas });
  })();

module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedidos,
  updatePedidos,
  deletePedidos,
};
