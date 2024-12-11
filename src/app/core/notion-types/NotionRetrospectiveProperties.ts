import { NotionRelation } from './NotionRelation.ts';
import { NotionSelect, NotionTitle } from './NotionProperty.ts';
import { NotionDate } from './NotionDate.ts';

export interface NotionRetrospectiveProperties {
  Sprint?: NotionTitle;
  Team?: NotionSelect;
  Date?: NotionDate;
  'Set the Stage'?: { relation: NotionRelation[] };
  'Gather data'?: { relation: NotionRelation[] };
  'Generate insights'?: { relation: NotionRelation[] };
  'Decide what to do'?: { relation: NotionRelation[] };
  Closing?: { relation: NotionRelation[] };
}