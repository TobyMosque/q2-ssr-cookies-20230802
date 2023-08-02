import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import { Router } from 'vue-router';
import { StorageLike, createPersistedState } from 'pinia-plugin-persistedstate';
import { Cookies } from 'quasar';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({ ssrContext }) => {
  const pinia = createPinia();
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;

  const cookiesStorage: StorageLike = {
    getItem: (key) => {
      return JSON.stringify(cookies.get(key));
    },
    setItem: (key, value) => {
      cookies.set(key, JSON.parse(value), {
        path: '/',
        sameSite: 'Lax',
        secure: !process.env.DEV,
        expires: 7,
      });
    },
  };

  const persistedState = createPersistedState({
    storage: cookiesStorage,
  });
  pinia.use(persistedState);

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});
