import { signalStoreFeature, type, withComputed } from "@ngrx/signals";
import { ClientState } from "./client.store";
import { computed } from "@angular/core";

export function withClientSelectors() {
  return signalStoreFeature(
    {state: type<ClientState>()},
    withComputed(({}) => ({
    }))
  );
}
