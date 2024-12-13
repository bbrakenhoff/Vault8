import { DateTime } from 'luxon';
import { RetrospectiveElement } from './RetrospectiveElement.ts';

export interface Retrospective {
  id: string;
  sprint: string | null;
  team: string | null;
  date: DateTime | null;
  phases: {
    setTheStage: string | RetrospectiveElement | null;
    gatherData: string | RetrospectiveElement | null;
    generateInsights: string | RetrospectiveElement | null;
    decideWhatToDo: string | RetrospectiveElement | null;
    closing: string | RetrospectiveElement | null;
  };
}