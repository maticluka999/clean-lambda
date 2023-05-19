export class BodyMissingError extends Error {
  constructor() {
    super('Body is missing.');
    this.name = 'BodyMissingError';
  }
}
