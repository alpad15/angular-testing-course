import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesCardListComponent } from "./courses-card-list.component";
import { CoursesModule } from "../courses.module";
import { COURSES } from "../../../../server/db-data";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { sortCoursesBySeqNo } from "../home/sort-course-by-seq";
import { Course } from "../model/course";
import { setupCourses } from "../common/setup-test-data";

describe("CoursesCardListComponent", () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let htmlEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [CoursesModule],
      declarations: [],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        htmlEl = fixture.debugElement;
      });
  }));
  it("Should create the component", () => {
    expect(component).toBeTruthy();
  });

  it("Should display the course list", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const cards = htmlEl.queryAll(By.css(".course-card"));

    expect(cards).toBeTruthy("There are no cards in the DOM");
    expect(cards.length).toBe(12, "Unexpected number of cards");
  });

  it("Should display the first course", () => {
    component.courses = setupCourses();
    fixture.detectChanges();

    const course = component.courses[0];
    const card = htmlEl.query(By.css(".course-card:first-child"));
    const title = card.query(By.css(".mat-card-title"));
    const image = card.query(By.css("img"));

    expect(card).toBeTruthy();
    expect(title.nativeElement.textContent).toBe(course.titles.description);
    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
