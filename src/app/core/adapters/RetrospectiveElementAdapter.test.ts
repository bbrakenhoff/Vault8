import { testDataStore } from '../../../test/TestDataStore.ts';
import { RetrospectiveElementAdapter } from './RetrospectiveElementAdapter.ts';

describe('RetrospectiveElementAdapter', () => {
  const testData = {
    notionQueryResponse: testDataStore.notionRetrospectiveElements(),
    retrospectiveElements: testDataStore.retrospectiveElements()
  };

  let adapter: RetrospectiveElementAdapter;

  beforeEach(() => {
    adapter = new RetrospectiveElementAdapter();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('toRetrospectiveElements', () => {
    it('should map NotionPage to RetrospectiveElement', () => {
      const result = adapter.toRetrospectiveElements(testData.notionQueryResponse);
      expect(result).toEqual(testData.retrospectiveElements);
    });
  });
});