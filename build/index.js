"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const zodSchema_1 = __importDefault(require("./utils/zodSchema"));
const schemaValidation_1 = __importDefault(require("./middlewares/schemaValidation"));
const checkDb_1 = __importDefault(require("./middlewares/checkDb"));
const bionify_1 = __importDefault(require("./controllers/bionify"));
require("dotenv").config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
}));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.post("/bionify", (0, schemaValidation_1.default)(zodSchema_1.default), checkDb_1.default, bionify_1.default);
app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
});
