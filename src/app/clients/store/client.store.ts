import { Client } from "../model/client.model";
import { signalStore, type, withState } from "@ngrx/signals";
import { withClientSelectors } from "./client.selectors";
import { withClientMethods } from "./client.methods";
import { EntityState, withEntities } from "@ngrx/signals/entities";

export interface ClientState extends EntityState<Client> {
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

export const initialState: ClientState = {
  ids: [],
  entityMap: {},
  isLoading: false,
  filter: {
    query: '',
    order: 'asc'
  },
};

export const ClientStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withEntities({entity: type<Client>()}),
  withClientSelectors(),
  withClientMethods()
);
