import {Initializer} from './services/initializer';
export function createInitializer(initializer: Initializer): () => void {
  return () => initializer.initialize();
}
