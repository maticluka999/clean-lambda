export class BodyNotJsonError extends Error {
  constructor() {
    super('Body is not in JSON format.');
    this.name = 'BodyNotJsonError';
  }
}
