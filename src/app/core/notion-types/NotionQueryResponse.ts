import { NotionPage } from './NotionPage.ts';

export interface NotionQueryResponse<Props> {
  results: NotionPage<Props>[];
}