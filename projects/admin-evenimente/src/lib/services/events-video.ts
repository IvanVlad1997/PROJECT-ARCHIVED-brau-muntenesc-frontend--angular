import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GalerieVideoCursuri} from '../../../../common/galerie-video-cursuri';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {GalerieVideoEvenimente} from '../../../../common/galerie-video-evenimente';

@Injectable({providedIn: 'root'})
export class EventsVideoService {
  private videosUpdated: BehaviorSubject<GalerieVideoEvenimente[]> = new BehaviorSubject<GalerieVideoEvenimente[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  getVideoPlatformListener(): Observable<GalerieVideoEvenimente[]> {
    return this.videosUpdated.asObservable();
  }

  getVideosPlatform(): void {
    this.http.get<GalerieVideoEvenimente[]>(`${environment.appApi}/galerie-videos-evenimente`)
      .subscribe((videos: GalerieVideoEvenimente[]) => {
        this.videosUpdated.next(videos);
      })
  }


  videoPlatformCreate(video: GalerieVideoEvenimente, token: string): void {
    this.http.post<GalerieVideoEvenimente>(`${environment.appApi}/galerie-video-evenimente`,
      {
        video: video
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(success => {
          console.log(success);
          this.getVideosPlatform();
          this.toastService.success(`Videoul ${video.name} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Videoul.`);
        });
  }

  videoPlatformUpdate(slug: string, video: GalerieVideoEvenimente, token: string): void {
    this.http.put<GalerieVideoEvenimente>(`${environment.appApi}/galerie-video-evenimente/${slug}`,
      {
        video: video
      },
      {
        headers: {
          authtoken: token
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

  removeVideoPlatform(slug: string, token: string): void {
    this.http.delete<GalerieVideoEvenimente>(`${environment.appApi}/galerie-video-evenimente/${slug}`,
      {
        headers: {
          authtoken: token
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
