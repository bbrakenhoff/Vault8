import { RetrospectiveStub } from './RetrospectiveStub.ts';
import { NotionPage, NotionRetrospectiveProperties } from '../app/core/notion-types';

export class RetrospectiveTestDataFactory {
  static createRetrospective(stub: RetrospectiveStub): RetrospectiveStub {
    return {
      id: stub.id,
      sprint: stub.sprint,
      team: stub.team,
      date: stub.date,
      phases: {
        setTheStage: stub.phases.setTheStage,
        gatherData: stub.phases.gatherData,
        generateInsights: stub.phases.generateInsights,
        decideWhatToDo: stub.phases.decideWhatToDo,
        closing: stub.phases.closing
      },
      createdTime: stub.createdTime,
      lastEditedTime: stub.lastEditedTime
    };
  }
  static createNotionPage(stub: RetrospectiveStub): NotionPage<NotionRetrospectiveProperties> {
    return {
      id: stub.id,
      properties: {
        Sprint: { title: [{ plain_text: stub.sprint }] },
        Team: { select: { name: stub.team } },
        Date: { date: { start: stub.date } },
        'Set the Stage': { relation: stub.phases.setTheStage ? [{ id: stub.phases.setTheStage as string }] : [] },
        'Gather data': { relation: stub.phases.gatherData ? [{ id: stub.phases.gatherData as string }] : [] },
        'Generate insights': {
          relation: stub.phases.generateInsights ? [{ id: stub.phases.generateInsights as string }] : []
        },
        'Decide what to do': {
          relation: stub.phases.decideWhatToDo ? [{ id: stub.phases.decideWhatToDo as string }] : []
        },
        Closing: { relation: stub.phases.closing ? [{ id: stub.phases.closing as string }] : [] }
      }
    };
  }
}