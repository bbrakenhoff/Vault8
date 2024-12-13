import { BaseAdapter } from './BaseAdapter.ts';
import {
  NotionPage,
  NotionQueryResponse,
  NotionRelation,
  NotionRetrospectiveProperties,
  NotionTitle
} from '../notion-types';
import { Retrospective, RetrospectiveElement } from '../models';

export class RetrospectiveAdapter extends BaseAdapter {
  toRetrospectives(notionResponse: NotionQueryResponse<NotionRetrospectiveProperties>): Retrospective[] {
    if (!notionResponse?.results) {
      return [];
    }

    return notionResponse.results.map((item: NotionPage<NotionRetrospectiveProperties>) => this.toRetrospective(item));
  }

  private toRetrospective(notionPage: NotionPage<NotionRetrospectiveProperties>): Retrospective {
    const properties = notionPage.properties as NotionRetrospectiveProperties;

    return {
      id: notionPage.id,
      sprint: this.extractTitle(properties.Sprint as NotionTitle | null),
      team: this.extractText(properties.Team?.select?.name ?? ''),
      date: this.extractDate(properties.Date?.date?.start),
      phases: {
        setTheStage: properties['Set the Stage']?.relation?.[0]?.id ?? null,
        gatherData: properties['Gather data']?.relation?.[0]?.id ?? null,
        generateInsights: properties['Generate insights']?.relation?.[0]?.id ?? null,
        decideWhatToDo: properties['Decide what to do']?.relation?.[0]?.id ?? null,
        closing: properties['Closing']?.relation?.[0]?.id ?? null
      }
    };
  }

  private extractRetrospectiveElement(relation: NotionRelation[] | null = null): RetrospectiveElement | null {
    if (relation && relation.length > 0) {
      return {
        id: this.extractRelation(relation)[0],
        theme: null,
        phase: [],
        name: null,
        link: null,
        attendanceOptions: [],
        usedInRetrospectiveIds: []
      };
    }

    return null;
  }
}