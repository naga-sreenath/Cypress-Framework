"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllureStep = exports.ExecutableItemWrapper = void 0;
const model_1 = require("./model");
const isPromise_1 = require("./isPromise");
const constructors_1 = require("./constructors");
class ExecutableItemWrapper {
    constructor(info) {
        this.info = info;
    }
    get wrappedItem() {
        return this.info;
    }
    set name(name) {
        this.info.name = name;
    }
    set description(description) {
        this.info.description = description;
    }
    set descriptionHtml(descriptionHtml) {
        this.info.descriptionHtml = descriptionHtml;
    }
    set status(status) {
        this.info.status = status;
    }
    get status() {
        return this.info.status;
    }
    set statusDetails(details) {
        this.info.statusDetails = details;
    }
    set detailsMessage(message) {
        this.info.statusDetails.message = message;
    }
    set detailsTrace(trace) {
        this.info.statusDetails.trace = trace;
    }
    set stage(stage) {
        this.info.stage = stage;
    }
    addParameter(name, value) {
        this.info.parameters.push({ name, value });
    }
    addAttachment(name, options, fileName) {
        if (typeof options === 'string') {
            options = { contentType: options };
        }
        this.info.attachments.push({
            name,
            type: options.contentType,
            source: fileName
        });
    }
    startStep(name, start) {
        const result = constructors_1.stepResult();
        this.info.steps.push(result);
        const allureStep = new AllureStep(result, start);
        allureStep.name = name;
        return allureStep;
    }
    wrap(fun) {
        return (...args) => {
            this.stage = model_1.Stage.RUNNING;
            let result;
            try {
                result = fun(args);
            }
            catch (error) {
                this.stage = model_1.Stage.INTERRUPTED;
                this.status = model_1.Status.BROKEN;
                if (error) {
                    this.detailsMessage = error.message || '';
                    this.detailsTrace = error.stack || '';
                }
                throw error;
            }
            if (isPromise_1.isPromise(result)) {
                const promise = result;
                return promise
                    .then((res) => {
                    this.status = model_1.Status.PASSED;
                    this.stage = model_1.Stage.FINISHED;
                    return res;
                })
                    .catch((error) => {
                    this.stage = model_1.Stage.INTERRUPTED;
                    this.status = model_1.Status.BROKEN;
                    if (error) {
                        this.detailsMessage =
                            error.message || '';
                        this.detailsTrace = error.stack || '';
                    }
                    throw error;
                });
            }
            else {
                this.status = model_1.Status.PASSED;
                this.stage = model_1.Stage.FINISHED;
                return result;
            }
        };
    }
}
exports.ExecutableItemWrapper = ExecutableItemWrapper;
class AllureStep extends ExecutableItemWrapper {
    constructor(stepResult, start = Date.now()) {
        super(stepResult);
        this.stepResult = stepResult;
        this.stepResult.start = start;
    }
    endStep(stop = Date.now()) {
        this.stepResult.stop = stop;
    }
}
exports.AllureStep = AllureStep;
//# sourceMappingURL=ExecutableItemWrapper.js.map