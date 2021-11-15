export interface AnimeItem {
  idMal: number;
  title: string;
  synopsis: string;
  poster: string;
  banner: string;
  year: number;
  season: string;
  synonyms: string[];
  genres: string[];
  trailer: string;
}

export interface Response {
  data: AnimeItem[]
}