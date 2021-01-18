import {Injectable} from '@angular/core';
import {NgxImageCompressService} from 'ngx-image-compress';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../projects/auth/src/lib/services/auth';

@Injectable({providedIn: 'root'})
export class CompressImageService {

  token: string = this.authService.tokenAdmin.getValue();

  constructor(private imageCompress: NgxImageCompressService,
              private http: HttpClient,
              private authService: AuthService) {
  }

  async compressFile(image, fileName, ratio: number): Promise<any> {
    console.log(image)
    const orientation = -1;
    const result = await this.imageCompress.compressFile(image, orientation, ratio, 90);
    console.log(result);
    let compressedImage: any;
    await this.http.post(`${environment.appApi}/uploadImages`,
          {
            image: result
          },
          {
            headers: {
              authtoken: this.token
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
          authtoken: this.token
        }
      }).toPromise().then(c => console.log(c));
  }

}
