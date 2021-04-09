import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {VideoPlatform} from '../../../../common/video-platform';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../../auth/src/lib/services/auth';
import {ToastService} from 'angular-toastify';
import {environment} from '../../../../../src/environments/environment';
import {Product} from '../../../../common/product';
import {GalerieVideoCursuri} from '../../../../common/galerie-video-cursuri';
import {Price} from '../../../../common/price';
import {Program} from '../../../../common/program';

@Injectable({providedIn: 'root'})
export class ProgramService {
  private programUpdated: BehaviorSubject<Program[]> = new BehaviorSubject<Program[]>([]);

  constructor(private http: HttpClient,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  getProgramListener(): Observable<Program[]> {
    return this.programUpdated.asObservable();
  }

  getPrograms(): void {
    this.http.get<Program[]>(`${environment.appApi}/programs`)
      .subscribe((programs: Program[]) => {
        this.programUpdated.next(programs);
      });
  }


  programCreate(program: Program, token: string): void {
    this.http.post<Program>(`${environment.appApi}/program`,
      {
        program: program
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(success => {
          this.getPrograms();
          this.toastService.success(`Pretul ${program.category} a fost creat cu succes!`);
        },
        err => {
          console.log(err);
          this.toastService.error(`Nu s-a crea Pretul.`);
        });
  }

  programUpdate(slug: string, program: Program, token: string): void {
    this.http.put<Program>(`${environment.appApi}/program/${slug}`,
      {
        program: program
      },
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(p => {
          this.toastService.success(`Videoul ${program.category} a fost editat cu succes!`);
          this.getPrograms();
        },
        (err) => {
          this.toastService.error(`Nu s-a putut edita Videoul.`);
        });
  }

  programRemove(slug: string, token: string): void {
    this.http.delete<Program>(`${environment.appApi}/program/${slug}`,
      {
        headers: {
          authtoken: token
        }
      })
      .subscribe(() => {
          this.toastService.success('Videoul a fost ștears!');
          this.getPrograms();
        },
        (err) => {
          this.toastService.error('Nu s-a putut șterge Videoul!');
        });
  }

}
