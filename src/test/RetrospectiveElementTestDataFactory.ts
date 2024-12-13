import { RetrospectiveElement } from '../app/core/models';
import { NotionPage, NotionRetrospectiveElementProperties } from '../app/core/notion-types';
import { RetrospectiveElementStub } from './RetrospectiveElementStub.ts';

export class RetrospectiveElementTestDataFactory {
  static createRetrospectiveElement(stub: RetrospectiveElementStub): RetrospectiveElement {
    return {
      id: stub.id,
      theme: stub.theme,
      phase: stub.phase,
      name: stub.name,
      link: stub.link,
      attendanceOptions: stub.attendanceOptions,
      usedInRetrospectiveIds: [] // TODO
    };
  }

  static createNotionPage(stub: RetrospectiveElementStub): NotionPage<NotionRetrospectiveElementProperties> {
    return {
      id: stub.id,
      properties: {
        Theme: { select: { name: stub.theme } },
        Phase: { multi_select: stub.phase.map((p) => ({ name: p })) },
        Name: { title: [{ plain_text: stub.name }] },
        Link: { rich_text: [{ plain_text: stub.link }] },
        'Attendance options': { multi_select: stub.attendanceOptions.map((option) => ({ name: option })) },
        '↔️ Retrospective planning': { relation: [] } // TODO
      }
    };
  }
}