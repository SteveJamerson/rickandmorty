import { environments } from '../environments';
import {
   RequestCharacter,
   RequestEpisode,
   RequestLocation,
   ResponseCharacter,
   ResponseEpisode,
   ResponseLocation,
} from './api.interfaces';

const { ENDPOINT } = environments;

export const getCharacter = async (
   params: RequestCharacter
): Promise<ResponseCharacter> => {
   return fetch(
      `${ENDPOINT}/character?${new URLSearchParams(
         Object.assign({}, ...(params?.query as any))
      )}`
   ).then((response) => response.json());
};

export const getLocation = async (
   params: RequestLocation
): Promise<ResponseLocation> => {
   const { query } = params;
   return fetch(
      `${ENDPOINT}/location?${new URLSearchParams(Object.assign({}, query))}`
   ).then((response) => response.json());
};

export const getEpisode = async (
   params: RequestEpisode
): Promise<ResponseEpisode> => {
   const { query } = params;
   return fetch(
      `${ENDPOINT}/episode?${new URLSearchParams(Object.assign({}, query))}`
   ).then((response) => response.json());
};
