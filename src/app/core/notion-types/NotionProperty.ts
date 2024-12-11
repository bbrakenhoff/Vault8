export interface NotionSelect {
  select: {
    name: string;
  };
}

export interface NotionMultiSelect {
  multi_select: {
    name: string;
  }[];
}

export interface NotionTitle {
  title: {
    plain_text: string;
  }[];
}

export interface NotionRichText {
  rich_text: {
    plain_text: string;
  }[];
}