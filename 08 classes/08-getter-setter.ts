interface SESConfig {
  from: string;
  to: string;
  subject: string;
  body: string;
  replyTo?: string;
}

class SendEmail {
  private config: SESConfig;

  set configuration(config: SESConfig) {
    this.config = config;
  }

  get configuration(): SESConfig {
    return this.config;
  }

  static get response(): string {
    return `Email send`;
  }
}

const sendEmail = new SendEmail();
const config: SESConfig = {
  from: "shidalgo@correo.com",
  to: "javier@correo.com",
  subject: "Hello World",
  body: "Hello World",
};

sendEmail.configuration = config;
console.log(sendEmail.configuration);
console.log(SendEmail.response);
