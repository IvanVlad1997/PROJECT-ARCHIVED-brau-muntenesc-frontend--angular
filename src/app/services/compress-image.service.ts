import {Inject, Injectable} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';
import {TOKEN} from '../app.token';
import {Token} from '../../../projects/auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class CompressImageService {



  constructor(private imageCompress: NgxImageCompressService,
              private http: HttpClient,
              private authService: AuthService,
              @Inject(TOKEN) private token: Token) {
  }

  async compressFile(image, fileName, ratio: number): Promise<any> {
    const orientation = -1;
    const result = await this.imageCompress.compressFile(image, orientation, ratio, 90);
    let compressedImage: any;
    await this.http.post(`${environment.appApi}/uploadImages`,
          {
            image: result
          },
          {
            headers: {
              authtoken: this.token.token.getValue()
            }
          })
      .toPromise().then(c => compressedImage = c);
    return compressedImage;
  }

  async removeImage(id): Promise<void> {
    await this.http.post(`${environment.appApi}/removeImage`,
      {
        public_id: id
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      }).toPromise().then(c => console.log(c));
  }

}
