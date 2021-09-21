import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactFormService} from "../services/contact-form";
import {NodemailerHelper} from "../../../../../src/app/services/nodemailer-helper";
import {ContactForm} from "../../../../common/contact-form";

@Component({
  selector: 'app-contact-from',
  templateUrl: './contact-from.component.html',
  styleUrls: ['./contact-from.component.scss']
})
export class ContactFromComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private contactFormService: ContactFormService,
              private nodemailerHelper: NodemailerHelper) {
  }

  contactForm: FormGroup = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [Validators.required]),
    telephoneNumber: this.formBuilder.control('', [Validators.required]),
    message: this.formBuilder.control('', [Validators.required])
  });

  ngOnInit(): void {
  }

  async submitForm(): Promise<void> {
    let formValues: ContactForm = {
      _id: undefined,
      _v: undefined,
      createdAt: undefined,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message,
      name: this.contactForm.value.name,
      slug: undefined,
      telephoneNumber: this.contactForm.value.telephoneNumber,
      updatedAt: undefined
    };
    await this.contactFormService.contactFormCreate(formValues);
    await this.nodemailerHelper.infoContactForm(formValues);

    formValues = {
      _id: undefined,
      _v: undefined,
      createdAt: undefined,
      email: '',
      message: '',
      name: '',
      slug: undefined,
      telephoneNumber: '',
      updatedAt: undefined
    };
    this.contactForm.reset(formValues);

    for (let control in this.contactForm.controls) {
      this.contactForm.controls[control].setErrors(null);
    }


  }
}
