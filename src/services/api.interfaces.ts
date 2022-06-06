export interface Response {
   info: {
      count: number;
      pages: number;
      next: string;
      prev: string;
   };
}

export interface Results {
   id: number;
   name: string;
   url: string;
   created: string;
}

export interface ResponseCharacter extends Response {
   results: ResultsCharacter[];
}

export interface ResultsCharacter extends Results {
   status: string;
   species: string;
   type: string;
   gender: string;
   origin: {
      name: string;
      url: string;
   };
   location: {
      name: string;
      url: string;
   };
   image: string;
   episode: string[];
}

export interface RequestCharacter {
   query?: {
      page?: string;
      name?: string;
      status?: 'alive' | 'dead';
      species?: string;
      type?: string;
      gender?: 'female' | 'male' | 'genderless';
   };
}

export interface ResponseLocation extends Response {
   results: ResultsLocation[];
}

export interface ResultsLocation extends Results {
   type: string;
   dimension: string;
   residents: string[];
   image?: string;
}

export interface RequestLocation {
   query?: {
      page?: string;
      name?: string;
      type?: string;
      dimension?: string;
   };
}

export interface ResponseEpisode extends Response {
   results: ResultsEpisode[];
}

export interface ResultsEpisode extends Results {
   air_date: string;
   episode: string;
   characters: string[];
   image?: string;
}

export interface RequestEpisode {
   query?: {
      page?: string;
      name?: string;
      episode?: string;
   };
}
