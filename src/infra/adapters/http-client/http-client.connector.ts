export default class HttpClientConnector {
  private domain: string;

  private api: string;

  private resource: string;

  private headers = {};

  public getDomain(): string {
    return this.domain;
  }

  public setDomain(value: string) {
    this.domain = value;
  }

  public getApi(): string {
    return this.api;
  }

  public setApi(value: string) {
    this.api = value;
  }

  public getResource(): string {
    return this.resource;
  }
  public setResource(value: string) {
    this.resource = value;
  }

  public getHeaders() {
    return this.headers;
  }

  public setHeaders(headers: object): void {
    this.headers = headers;
  }

  public getURI(): string {
    return `${this.getDomain()}/${this.getApi()}/${this.getResource()}`;
  }
}
