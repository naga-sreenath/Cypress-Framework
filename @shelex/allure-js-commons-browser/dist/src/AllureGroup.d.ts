import { ExecutableItemWrapper } from './ExecutableItemWrapper';
import { AllureTest } from './AllureTest';
import { AllureRuntime } from './AllureRuntime';
export declare class AllureGroup {
    private readonly runtime;
    private testResultContainer;
    constructor(runtime: AllureRuntime);
    startGroup(name?: string): AllureGroup;
    startTest(name?: string, start?: number): AllureTest;
    endGroup(): void;
    get uuid(): string;
    get name(): string;
    set name(name: string);
    addBefore(): ExecutableItemWrapper;
    addAfter(): ExecutableItemWrapper;
}
