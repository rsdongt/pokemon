export enum EPageStatus {
  MAIN = "MAIN",
  INTERACT = "INTERACT",
  RESULT = "RESULT",
}

export type TGameMode = {
  id: string;
  title: string;
  description: string;
  totalCards: number;
};

export type TGlobalState = {
  pageStatus: EPageStatus;
  gameMode?: TGameMode;
  timmer?: string;
};

export enum ECardStatus {
  PENDING = "PENDING",
  COMPARING = "COMPARING",
  MATCHED = "MATCHED",
}

export type TCardDetail = {
  url: string;
  status: ECardStatus;
  index?: number;
};
