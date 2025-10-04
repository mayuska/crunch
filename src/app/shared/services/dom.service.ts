import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  private http = inject(HttpClient);

  /**
   * Fetches an SVG image from the assets/icons directory.
   * @param imgName Name of the icon in 'assets/img/' (without .svg extension)
   */
  public getSvgImg(imgName: string) {
    return this.http.get(`assets/img/${imgName}.svg`, { responseType: 'text' });
  }
}
