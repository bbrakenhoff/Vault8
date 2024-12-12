import { RetrospectiveStub } from './RetrospectiveStub.ts';
import { RetrospectiveElementStub } from './RetrospectiveElementStub.ts';
import { testRetrospectiveElements } from './stubs/retrospectiveElements.ts';
import { testRetrospectives } from './stubs/retrospectives.ts';
import { RetrospectiveElement } from '../app/core/models';

interface TestData {
  retrospectives: { full: RetrospectiveStub[]; refOnly: RetrospectiveStub[] };
  retrospectiveElements: RetrospectiveElementStub[];
}

class TestDataStore {
  private readonly testData: TestData;

  constructor() {
    this.testData = {
      retrospectiveElements: testRetrospectiveElements,
      retrospectives: testRetrospectives
    };
  }

  mapRetrospectiveElementsToDomainModel(): RetrospectiveElement[] {
    return this.testData.retrospectiveElements.map(
      (element) =>
        ({
          id: element.id,
          name: element.name,
          theme: element.theme,
          link: element.link,
          attendanceOptions: element.attendanceOptions,
          phase: element.phase,
          instruction: element.instruction,
          createdTime: null, // You may want to add a default value or a way to generate this
          lastEditedTime: null, // You may want to add a default value or a way to generate this
          usedInRetrospectiveIds: []
        }) as RetrospectiveElement
    );
  }
}

export const testDataStore = new TestDataStore();