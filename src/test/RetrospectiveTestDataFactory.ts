import { RetrospectiveStub } from './RetrospectiveStub.ts';
import { NotionPage, NotionRetrospectiveProperties } from '../app/core/notion-types';
import { Retrospective } from '../app/core/models';
import { DateTime } from 'luxon';

export class RetrospectiveTestDataFactory {
  static createRetrospective(stub: RetrospectiveStub): Retrospective {
    return {
      id: stub.id,
      sprint: stub.sprint,
      team: stub.team,
      date: stub.date ? DateTime.fromISO(stub.date) : null,
      phases: {
        setTheStage: stub.phases.setTheStage as string,
        gatherData: stub.phases.gatherData as string,
        generateInsights: stub.phases.generateInsights as string,
        decideWhatToDo: stub.phases.decideWhatToDo as string,
        closing: stub.phases.closing as string
      }
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