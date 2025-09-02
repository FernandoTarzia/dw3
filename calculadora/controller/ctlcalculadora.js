// Funções de operações aritméticas
const fSoma = (num1Par, num2Par) => {
    return num1Par + num2Par;
};

const fSubtracao = (num1Par, num2Par) => {
    return num1Par - num2Par;
};

const fMultiplicacao = (num1Par, num2Par) => {
    return num1Par * num2Par;
};

const fDivisao = (num1Par, num2Par) => {
    if (num2Par === 0) {
        return "Erro: divisão por zero";
    }
    return num1Par / num2Par;
};

// Função principal 
const fCalculo = (req, res) => {
    const { num1, num2, operacao } = req.body;

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
        return res.status(400).json({ erro: "num1 e num2 devem ser números válidos" });
    }

    let resultado;

    switch (operacao) {
        case "+":
            resultado = fSoma(n1, n2);
            break;
        case "-":
            resultado = fSubtracao(n1, n2);
            break;
        case "*":
            resultado = fMultiplicacao(n1, n2);
            break;
        case "/":
            resultado = fDivisao(n1, n2);
            break;
        default:
            return res.status(400).json({ erro: "Operação inválida" });
    }

    res.json({
        num1: n1,
        num2: n2,
        operacao,
        resultado
    });
};

module.exports = {
    fSoma,
    fSubtracao,
    fMultiplicacao,
    fDivisao,
    fCalculo
};
