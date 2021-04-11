import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlatform} from '../../../../common/video-platform';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Product} from '../../../../common/product';
import {GalerieVideoCursuri} from '../../../../common/galerie-video-cursuri';
import {TOKEN} from '../../../../../src/app/app.token';
import {Token} from '../../../../auth/src/lib/services/token';

@Injectable({providedIn: 'root'})
export class GalerieVideoService {
  private videosUpdated: BehaviorSubject<GalerieVideoCursuri[]> = new BehaviorSubject<GalerieVideoCursuri[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService,
              @Inject(TOKEN) private token: Token) {
  }

  getVideoPlatformListener(): Observable<GalerieVideoCursuri[]> {
    return this.videosUpdated.asObservable();
  }

  getVideosPlatform(): void {
    this.http.get<GalerieVideoCursuri[]>(`${environment.appApi}/galerie-videos-cursuri`)
      .subscribe((videos: GalerieVideoCursuri[]) => {
        this.videosUpdated.next(videos);
      });
  }


  videoPlatformCreate(video: GalerieVideoCursuri): void {
    this.http.post<GalerieVideoCursuri>(`${environment.appApi}/galerie-video-cursuri`,
      {
        video: video
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(success => {
          this.getVideosPlatform();
          this.toastService.success(`Videoul ${video.name} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Videoul.`);
        });
  }

  videoPlatformUpdate(slug: string, video: GalerieVideoCursuri): void {
    this.http.put<GalerieVideoCursuri>(`${environment.appApi}/galerie-video-cursuri/${slug}`,
      {
        video: video
      },
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(p => {
          this.toastService.success(`Videoul ${video.name} a fost editat cu succes!`);
          this.getVideosPlatform();
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita Videoul.`);
        });
  }

  removeVideoPlatform(slug: string): void {
    this.http.delete<GalerieVideoCursuri>(`${environment.appApi}/galerie-video-cursuri/${slug}`,
      {
        headers: {
          authtoken: this.token.token.getValue()
        }
      })
      .subscribe(() => {
          this.toastService.success('Videoul a fost ștears!');
          this.getVideosPlatform();
        },
        (err) => {
          this.toastService.error('Nu s-a putut șterge Videoul!');
        });
  }

}
