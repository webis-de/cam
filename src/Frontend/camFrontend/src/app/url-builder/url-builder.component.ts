import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-url-builder',
  templateUrl: './url-builder.component.html',
  styleUrls: ['./url-builder.component.css']
})
export class UrlBuilderComponent implements OnInit {
  /**
   *  The name of the server. Change this to 'http://127.0.0.1:5000/cam' if you want to communicate
   *  with your locally hosted server instead, to 'http://ltdemos.informatik.uni-hamburg.de/cam-api'
   *  if you want to communicate with ltdemos.
   */
  HOSTNAME = 'http://ltdemos.informatik.uni-hamburg.de/cam-api';

  constructor() {}

  ngOnInit() {}

  /**
   * Builds the URL needed for communicating with the server and requesting the search.
   *
   * @param objA the first object entered by the user
   * @param objB the second object entered by the user
   * @param aspectList the list of aspects with their weights entered by the user
   * @returns the URL
   */
  buildURL(objA, objB, aspectList) {
    let URL = this.buildObjURL(objA, objB);
    URL += this.addAspectURL(aspectList);
    return URL;
  }

  /**
   * Builds the first part of the URL containing the host address and the objects entered.
   *
   * @param objA the first object entered by the user
   * @param objB the second object entered by the user
   * @returns the first part of the URL
   */
  buildObjURL(objA, objB) {
    return `${this.HOSTNAME}?objectA=${objA}&objectB=${objB}`;
  }

  /**
   * Adds a URL part containing the aspects entered by the user to an already existing first part
   * of a URL.
   *
   * @param aspectList the list of aspects with their weights entered by the user
   * @returns the second part of the URL
   */
  addAspectURL(aspectList) {
    let url_part = ``;
    let i = 1;
    Object.entries(aspectList).forEach(
      ([key, value]) => (url_part += `&aspect${i}=${key}&weight${i++}=${value}`)
    );
    return url_part;
  }
}