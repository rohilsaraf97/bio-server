"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const prisma_1 = __importDefault(require("../prisma"));
const bionify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { htmlBody, fixation, saccade, url } = req.body;
    const encodedParams = new URLSearchParams();
    encodedParams.append("content", htmlBody);
    encodedParams.append("response_type", "html");
    encodedParams.append("request_type", "html");
    encodedParams.append("fixation", fixation);
    encodedParams.append("saccade", saccade);
    const options = {
        method: "POST",
        url: "https://bionic-reading1.p.rapidapi.com/convert",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
            "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            "X-RapidAPI-Host": process.env.RAPID_API_HOST,
        },
        data: encodedParams,
    };
    try {
        const resp = yield axios_1.default.request(options);
        const new_url = yield prisma_1.default.url.create({
            data: {
                url: url,
                bioBody: resp.data,
            },
        });
        return res.send(resp.data);
    }
    catch (error) {
        return res.send(error);
    }
});
exports.default = bionify;
