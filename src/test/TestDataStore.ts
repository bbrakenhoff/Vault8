import { RetrospectiveStub } from './RetrospectiveStub.ts';
import { retrospectiveElementStubs } from './stubs/retrospectiveElements.ts';
import {
  NotionQueryResponse,
  NotionRetrospectiveElementProperties,
  NotionRetrospectiveProperties
} from '../app/core/notion-types';
import { retrospectivesStubs } from './stubs/retrospectives.ts';
import { RetrospectiveElement } from '../app/core/models';
import { RetrospectiveElementTestDataFactory } from './RetrospectiveElementTestDataFactory.ts';
import { RetrospectiveTestDataFactory } from './RetrospectiveTestDataFactory.ts';

class TestDataStore {
  private readonly stubs = {
    retrospectiveElements: retrospectiveElementStubs,
    retrospectives: retrospectivesStubs
  };

  retrospectiveElements(): RetrospectiveElement[] {
    return this.stubs.retrospectiveElements.map((stub) =>
      RetrospectiveElementTestDataFactory.createRetrospectiveElement(stub)
    );
  }

  notionRetrospectiveElements(): NotionQueryResponse<NotionRetrospectiveElementProperties> {
    return {
      results: this.stubs.retrospectiveElements.map((stub) =>
        RetrospectiveElementTestDataFactory.createNotionPage(stub)
      )
    };
  }

  retrospectives(): RetrospectiveStub[] {
    return this.stubs.retrospectives.refOnly.map((stub) => RetrospectiveTestDataFactory.createRetrospective(stub));
  }

  notionRetrospectives(): NotionQueryResponse<NotionRetrospectiveProperties> {
    return {
      results: this.stubs.retrospectives.refOnly.map((stub) => RetrospectiveTestDataFactory.createNotionPage(stub))
    };
  }
}

export const testDataStore = new TestDataStore();