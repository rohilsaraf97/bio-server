"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const dataSchema = zod_1.z.object({
    body: zod_1.z.object({
        htmlBody: zod_1.z.string({
            required_error: "Html Body is required",
        }),
        fixation: zod_1.z.string({
            required_error: "Fixation is required",
        }),
        saccade: zod_1.z.string({
            required_error: "Saccade is required",
        }),
        url: zod_1.z
            .string({
            required_error: "URL is required",
        })
            .url({ message: "Invalid url" }),
    }),
});
exports.default = dataSchema;
