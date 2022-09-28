import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { of } from "rxjs";
import { delay } from "rxjs/operators";

describe("Async testing examples", () => {
  it("Asynchronous test example with Jasmine done", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("Running assertion done()...");
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Async test example - setTimeout()", fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      console.log("Running assertion setTimeout()...");
      test = true;
    }, 1000);
    //tick(1000);
    flush();
    expect(test).toBeTrue();
  }));

  it("Async test example - plain Promise", fakeAsync(() => {
    let test = false;
    console.log("Creating Promise");
    Promise.resolve().then(() => {
      console.log("Promise evaluated successfully");
      test = true;
    });
    flushMicrotasks();
    console.log("Running assetion Promise()...");
    expect(test).toBeTrue();
  }));

  it("Async test example - Promises + setTimeout", fakeAsync(() => {
    let counter = 0;
    Promise.resolve().then(() => {
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });
    expect(counter).toBe(0);
    flushMicrotasks();
    tick(1000);
    expect(counter).toBe(11);
  }));

  it("Async test example - Observables", fakeAsync(() => {
    let test = false;
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    expect(test).toBeTrue();
  }));
});
