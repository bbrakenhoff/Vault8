import { testDataStore } from '../../../test/TestDataStore.ts';
import { RetrospectiveAdapter } from './RetrospectiveAdapter.ts';

describe('RetrospectiveAdapter', () => {
  const testData = {
    notionQueryResponse: testDataStore.notionRetrospectives(),
    retrospectives: testDataStore.retrospectives()
  };

  let adapter: RetrospectiveAdapter;

  beforeEach(() => {
    adapter = new RetrospectiveAdapter();
  });

  it('should be created', () => {
    expect(adapter).toBeTruthy();
  });

  describe('toRetrospectives()', () => {
    it('should map NotionPage<RetrospectiveProperties> to Retrospective', () => {
      const results = adapter.toRetrospectives(testData.notionQueryResponse);
      expect(results).toEqual(testData.retrospectives);
    });
  });
});