import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("Calculator Service", () => {
  let calculator: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    console.log("Calling beforeEach...");
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy,
        },
      ],
    });
    calculator = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    console.log("Adding two numbers test");
    const result = calculator.add(8, 5);

    expect(result).toBe(13);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should substrct two numbers", () => {
    console.log("Substracting two numbers test");
    const result = calculator.subtract(8, 5);

    expect(result).toBe(3, "Unexpected substraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
