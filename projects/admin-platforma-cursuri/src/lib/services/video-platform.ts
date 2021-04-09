import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlatform} from '../../../../common/video-platform';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Product} from '../../../../common/product';

@Injectable({providedIn: 'root'})
export class VideoPlatformService {
  private videosUpdated: BehaviorSubject<VideoPlatform[]> = new BehaviorSubject<VideoPlatform[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  getVideoPlatformListener(): Observable<VideoPlatform[]> {
    return this.videosUpdated.asObservable();
  }

  getVideosPlatform(token: string): void {
    this.http.get<VideoPlatform[]>(`${environment.appApi}/videos-platform`)
      .subscribe((videos: VideoPlatform[]) => {
        this.videosUpdated.next(videos);
      });
  }


  getVideosPlatformWithLimit(token: string, windowInnerHeight: number): Observable<VideoPlatform[]> {
    return this.http.post<VideoPlatform[]>(`${environment.appApi}/video-platform-limit`,
      {
        windowInnerHeight: windowInnerHeight
      });
  }

  getVideoPlatformBySubCategory(subCategory: string, slug: string): Observable<VideoPlatform[]> {
    return this.http.post<VideoPlatform[]>(`${environment.appApi}/video-platform-subcategory`,
      {
        slug: slug,
        subCategory: subCategory
      });
  }


  videoPlatformCreate(video: VideoPlatform, token: string): void {
    this.http.post<Product>(`${environment.appApi}/video-platform`,
      {
        videoP: video
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(success => {
          this.getVideosPlatform(token);
          this.toastService.success(`Videoul ${video.name} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Videoul.`);
        });
  }

  getPlatformVideo(slug: string): Observable<{ video: VideoPlatform }> {
    return this.http.get<{ video: VideoPlatform }>(`${environment.appApi}/video-platform/${slug}`);
  }

  videoPlatformUpdate(slug: string, video: VideoPlatform, token: string): void {
    this.http.put<Product>(`${environment.appApi}/video-platform/${slug}`,
      {
        videoP: video
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(p => {
          this.toastService.success(`Videoul ${video.name} a fost editat cu succes!`);
          this.getVideosPlatform(token);
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita Videoul.`);
        });
  }

  removeVideoPlatform(slug: string, token: string): void {
    this.http.delete<Product>(`${environment.appApi}/video-platform/${slug}`,
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(() => {
          this.toastService.success('Videoul a fost ștears!');
          this.getVideosPlatform(token);
        },
        (err) => {
          this.toastService.error('Nu s-a putut șterge Videoul!');
        });
  }

}
