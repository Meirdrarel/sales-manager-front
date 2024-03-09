import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  public setItem(key: string, value: string) {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  public getItem(key: string) {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  public removeItem(key: string) {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  public clear() {
    if (this.isBrowser) {
      localStorage.clear();
    }
  }
}
