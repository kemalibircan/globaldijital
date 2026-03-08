/**
 * Global loading state: API istekleri ve sayfa geçişleri için spinner tetikler.
 * Axios interceptors ve sayfa geçişi dinleyicisi bu store'u günceller.
 */

type Listener = () => void;

let apiCount = 0;
let navLoading = false;
const listeners: Listener[] = [];

function notify() {
  listeners.forEach((l) => l());
}

export function getLoading(): boolean {
  return apiCount > 0 || navLoading;
}

export function subscribe(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    const i = listeners.indexOf(listener);
    if (i !== -1) listeners.splice(i, 1);
  };
}

/** API isteği başladığında çağrılır */
export function startApi(): void {
  apiCount += 1;
  notify();
}

/** API isteği bittiğinde (başarı veya hata) çağrılır */
export function endApi(): void {
  if (apiCount > 0) apiCount -= 1;
  notify();
}

/** Sayfa geçişi başladığında true, bittiğinde false */
export function setNavLoading(loading: boolean): void {
  if (navLoading === loading) return;
  navLoading = loading;
  notify();
}
