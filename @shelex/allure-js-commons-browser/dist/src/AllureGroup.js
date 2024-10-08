"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllureGroup = void 0;
const ExecutableItemWrapper_1 = require("./ExecutableItemWrapper");
const AllureTest_1 = require("./AllureTest");
const constructors_1 = require("./constructors");
class AllureGroup {
    constructor(runtime) {
        this.runtime = runtime;
        this.testResultContainer = constructors_1.testResultContainer();
    }
    startGroup(name) {
        const group = new AllureGroup(this.runtime);
        this.testResultContainer.children.push(group.uuid);
        group.name = name || 'Unnamed';
        return group;
    }
    startTest(name, start) {
        const test = new AllureTest_1.AllureTest(this.runtime, start);
        this.testResultContainer.children.push(test.uuid);
        test.name = name || 'Unnamed';
        return test;
    }
    endGroup() {
        this.runtime.writeGroup(this.testResultContainer);
    }
    get uuid() {
        return this.testResultContainer.uuid;
    }
    get name() {
        return this.testResultContainer.name || '';
    }
    set name(name) {
        this.testResultContainer.name = name;
    }
    addBefore() {
        const result = constructors_1.fixtureResult();
        this.testResultContainer.befores.push(result);
        return new ExecutableItemWrapper_1.ExecutableItemWrapper(result);
    }
    addAfter() {
        const result = constructors_1.fixtureResult();
        this.testResultContainer.afters.push(result);
        return new ExecutableItemWrapper_1.ExecutableItemWrapper(result);
    }
}
exports.AllureGroup = AllureGroup;
//# sourceMappingURL=AllureGroup.js.map