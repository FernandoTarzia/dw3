const express = require("express");
const router = express.Router();

// Controllers
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appPedidos = require("../apps/pedidos/controller/ctlPedidos");
const appLogin   = require("../apps/login/controller/ctlLogin");

router.use((req, res, next) => {
  next();
});

router.get("/", (req, res) => {
    res.send("API Cliente-Pedido rodando!");
});

// ==================== CLIENTES ==================== //
router.get("/clientes", appClientes.getAllClientes);
router.post("/clientes/id", appClientes.getClienteByID);
router.post("/clientes",appLogin.AutenticaJWT,appClientes.insertClientes);
router.put("/clientes", appClientes.updateClientes);
router.delete("/clientes", appClientes.deleteClientes);

// ==================== PEDIDOS ==================== //
router.get("/pedidos", appPedidos.getAllPedidos);
router.post("/pedidos/id", appPedidos.getPedidoByID);
router.post("/pedidos", appPedidos.insertPedidos);
router.put("/pedidos", appPedidos.updatePedidos);
router.delete("/pedidos", appPedidos.deletePedidos);

// ==================== LOGIN ==================== //
router.post("/login", appLogin.Login);
router.post("/Logout", appLogin.Logout);

module.exports = router;
