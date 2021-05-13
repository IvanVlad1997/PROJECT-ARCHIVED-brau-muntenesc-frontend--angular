import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';
import {SubCategory} from '../../../../common/sub-category';
import {environment} from '../../../../../src/environments/environment';

@Injectable({providedIn: 'root'})
export class SubCategoryManager {
  constructor(private http: HttpClient,
              @Inject(TOKEN) private token: Token) {

  }

  async updateSubCategory(slug: string, subCategory: SubCategory): Promise<SubCategory> {
    return this.http.put<SubCategory>(`${environment.appApi}/sub-category/${slug}`, {subCategory},
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      }).toPromise();
  }

  async createSubCategory(subCategory: SubCategory): Promise<SubCategory> {
    return this.http.post<SubCategory>(`${environment.appApi}/sub-category`, {subCategory},
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      }).toPromise();
  }

  async removeSubCategory(slug: string): Promise<SubCategory> {
    return this.http.delete<SubCategory>(`${environment.appApi}/sub-category/${slug}`, {
      headers: {
        authtoken: this.token.token.getValue()
      }
    }).toPromise();
  }
}
