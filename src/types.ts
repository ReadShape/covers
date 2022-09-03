export type Font = {
  fontSize: number;
  fontFamily: 'sans-serif' | 'serif' | string;
  fontWeight: string;
  fontColor: string;
};

export enum StorageOptions{
  indexeddb = "INDEXEDDB",
  localstorage = "LOCALSTORAGE",
  sessionstorage = "SESSIONSTORAGE",
}

export type CacheOptions = {
  identifier?: string;
  storage: StorageOptions;
}
