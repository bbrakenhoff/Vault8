import { NotionMultiSelect, NotionRichText, NotionSelect, NotionTitle } from './NotionProperty.ts';
import { NotionRelation } from './NotionRelation.ts';

export interface NotionRetrospectiveElementProperties {
  Theme?: NotionSelect;
  Phase?: NotionMultiSelect;
  Name?: NotionTitle;
  Link?: NotionRichText;
  'Attendance options'?: NotionMultiSelect;
  '↔️ Retrospective planning'?: { relation: NotionRelation[] };
}