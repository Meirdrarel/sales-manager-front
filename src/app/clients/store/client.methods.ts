import { patchState, signalStoreFeature, type, withMethods } from "@ngrx/signals";
import { ClientState } from "./client.store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { addEntities } from "@ngrx/signals/entities";
import { Client } from "../model/client.model";

const GET_ALL_CLIENTS = gql`
  query {
    getAllClients {
      id
      corporateName
    }
  }
`;

export function withClientMethods() {
  return signalStoreFeature(
    {state: type<ClientState>()},
    withMethods((state, apollo = inject(Apollo)) => ({
        loadAllClients: rxMethod<void>(
          pipe(
            switchMap(() => {
              patchState(state, {isLoading: true});
              return apollo.query<any>({
                query: GET_ALL_CLIENTS
              }).pipe(tap({
                next: ({data}) => {
                  patchState(state, addEntities(data.getAllClients));
                },
                error: () => console.error,
                finalize: () => {
                  patchState(state, {isLoading: false});
                }
              }));
            })
          )
        )
      })
    )
  );
}
