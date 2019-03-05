export abstract class BaseMock {

    /**
     * Gets the mock functions
     */
    public get Mock() { return this.MockFunctions; }

    /**
     * Mock functions
     */
    private MockFunctions: any;

    /**
     * Initializes a new instance of Mock
     */
    constructor(returnError: boolean) {
        this.MockFunctions = this.CreateMock(returnError);
    }

    /**
     * Function to create the mock objects
     */
    protected abstract CreateMock(returnError: boolean): any;
}
