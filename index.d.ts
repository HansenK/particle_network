export interface ParticleOptions {
  color?: string;
  speed?: number;
  density?: number;
}

export default class ParticleNetwork {
  constructor(canvas: HTMLCanvasElement, options?: ParticleOptions);
  init(): void;
  destroy(): void;
}
