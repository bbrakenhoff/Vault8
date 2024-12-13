import {
  NotionMultiSelect,
  NotionPage,
  NotionQueryResponse,
  NotionRetrospectiveElementProperties,
  NotionRichText,
  NotionTitle
} from '../notion-types';
import { RetrospectiveElement } from '../models';
import { BaseAdapter } from './BaseAdapter.ts';

export class RetrospectiveElementAdapter extends BaseAdapter {
  toRetrospectiveElements(
    notionResponse: NotionQueryResponse<NotionRetrospectiveElementProperties>
  ): RetrospectiveElement[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((notionPage) => this.toRetrospectiveElement(notionPage));
  }

  private toRetrospectiveElement(notionPage: NotionPage<NotionRetrospectiveElementProperties>): RetrospectiveElement {
    const properties = notionPage.properties as NotionRetrospectiveElementProperties;

    return {
      id: notionPage.id,
      theme: this.extractText(properties.Theme?.select?.name ?? null),
      phase: this.extractMultiSelect(properties.Phase as NotionMultiSelect),
      name: this.extractTitle(properties.Name as NotionTitle | null),
      link: this.extractRichText(properties.Link as NotionRichText | null),
      attendanceOptions: this.extractMultiSelect(properties['Attendance options'] as NotionMultiSelect),
      usedInRetrospectiveIds: this.extractRelation(properties['↔️ Retrospective planning']?.relation)
    };
  }
}