import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../../../auth/src/lib/services/auth';

@Component({
  selector: 'lib-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  loading: boolean = false;
  password: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async updatePassword(form: NgForm): Promise<void> {
    this.loading = true;
    await this.authService.updatePassword(this.password);
    this.loading = false;
    form.resetForm();
  }
}
