import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../model/result';

@Injectable()
export class HTTPRequestService {

  constructor(private httpClient: HttpClient) { }

  getScore(url: string) {
    return this.httpClient.get<Result>(url);
  }

  /**
   * Requests the status of answer processing to show the user the progress.
   *
   * @param url to the backend status endpoint
   * @returns subscribable
   */
  getStatus(url: string) {
    return this.httpClient.get<string>(url);
  }

}