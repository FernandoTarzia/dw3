const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const Login = async (req, res, next) => {
    const credencial = await mdlLogin.GetCredencial(req.body.username);
    if (credencial.length == 0) {
        return res.status(200).json({ message: "Usuário nãoidentificado!" });
    }

    if (bCrypt.compareSync(req.body.password, credencial[0].password)) {
        //authok
        const username = credencial[0].username;
        const token = jwt.sign({ username }, process.env.SECRET_API, {
            expiresIn: 600, //expires in 10min
        });
        return res.json({ auth: true, token: token });
    }
    res.status(200).json({ message: "Logininválido!" });
};
function AutenticaJWT(req, res, next) {
    const tokenHeader = req.headers["authorization"];
    if (!tokenHeader)
        return res
            .status(200)
            .json({ auth: false, message: "Nãofoi informadoo tokenJWT" });

    const bearer = tokenHeader.split(" ");
    const token = bearer[1];

    jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
        if (err)
            return res
                .status(200)
                .json({ auth: false, message: "JWTinválido ouexpirado" });

        req.userId = decoded.id;
        next();
    });
}

const Logout = (req, res, next) => {
    res.json({ auth: false, token: null });
};

module.exports = {
    Login,
    Logout,
    AutenticaJWT,
};