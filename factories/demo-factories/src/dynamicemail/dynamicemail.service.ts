import { Inject, Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { EMAIL_CONFIG_OPTIONS } from './constants';
import { EmailOptions } from './options';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;

  constructor(@Inject(EMAIL_CONFIG_OPTIONS) private options: EmailOptions) {
    this.nodemailerTransport = createTransport({
      service: options.service,
      auth: {
        user: options.user,
        pass: options.password,
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
