import { APP_PREFIX } from "../models/globals";

class LocalStorageHelper {
  private static _instance: LocalStorageHelper;

  private constructor() {}

  private guard(key: string): void {
    if (!key) throw new Error(`Value for key ${key} cannot be null or empty.`);
  }

  public static instance(): LocalStorageHelper {
    if (!LocalStorageHelper._instance)
      LocalStorageHelper._instance = new LocalStorageHelper();

    return LocalStorageHelper._instance;
  }

  getKey<T>(key: string): T {
    this.guard(key);

    return JSON.parse(localStorage.getItem(`${APP_PREFIX}.${key}`)) as T;
  }

  setKey<T>(key: string, value: T): void {
    this.guard(key);

    localStorage.setItem(`${APP_PREFIX}.${key}`, JSON.stringify(value));
  }
}

export default LocalStorageHelper;
