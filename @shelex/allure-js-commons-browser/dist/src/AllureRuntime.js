"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllureRuntime = void 0;
const uuid_1 = require("uuid");
const AllureGroup_1 = require("./AllureGroup");
const writers_1 = require("./writers");
class AllureRuntime {
    constructor(config) {
        this.config = config;
        this.writer = config.writer || new writers_1.InMemoryAllureWriter();
    }
    startGroup(name) {
        const allureContainer = new AllureGroup_1.AllureGroup(this);
        allureContainer.name = name || 'Unnamed';
        return allureContainer;
    }
    writeResult(result) {
        const modifiedResult = this.config.testMapper === undefined
            ? result
            : this.config.testMapper(result);
        if (modifiedResult !== null) {
            this.writer.writeResult(modifiedResult);
        }
    }
    writeGroup(result) {
        this.writer.writeGroup(result);
    }
    writeAttachment(content, options) {
        if (typeof options === 'string') {
            options = { contentType: options };
        }
        const extension = writers_1.typeToExtension(options);
        const fileName = `${uuid_1.v4()}-attachment.${extension}`;
        this.writer.writeAttachment(fileName, content);
        return fileName;
    }
    writeEnvironmentInfo(info) {
        this.writer.writeEnvironmentInfo(info || process.env);
    }
    writeCategoriesDefinitions(categories) {
        const serializedCategories = categories.map((c) => {
            if (c.messageRegex instanceof RegExp) {
                c.messageRegex = c.messageRegex.source;
            }
            if (c.traceRegex instanceof RegExp) {
                c.traceRegex = c.traceRegex.source;
            }
            return c;
        });
        this.writer.writeCategoriesDefinitions(serializedCategories);
    }
}
exports.AllureRuntime = AllureRuntime;
//# sourceMappingURL=AllureRuntime.js.map