import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { ExcelService } from './excel.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';
import { CopiedModalComponent } from './copied-modal/copied-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, LottieComponent, CopiedModalComponent],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private platformID = inject(PLATFORM_ID);
  public showAnimation1 = signal<boolean>(false);
  public wasCopied = signal<boolean>(false);
  private animationItem1: AnimationItem | undefined;
  private animationItem2: AnimationItem | undefined;
  private animationItem3: AnimationItem | undefined;
  private animationItem4: AnimationItem | undefined;
  options1: AnimationOptions = {
    path: 'monkey-dancing.json',
    loop: true,
    autoplay: true,
  };
  options2: AnimationOptions = {
    path: 'monkey2.json',
    loop: true,
    autoplay: true,
  };
  options3: AnimationOptions = {
    path: 'copy-gif.json',
    loop: true,
    autoplay: true,
  };
  options4: AnimationOptions = {
    path: 'lips.json',
    loop: true,
    autoplay: true,
  };

  animationCreated1(animationItem: AnimationItem): void {
    if (isPlatformBrowser(this.platformID)) {
      this.animationItem1 = animationItem;
    }
  }

  animationCreated2(animationItem: AnimationItem): void {
    if (isPlatformBrowser(this.platformID)) {
      this.animationItem2 = animationItem;
    }
  }
  animationCreated3(animationItem: AnimationItem): void {
    if (isPlatformBrowser(this.platformID)) {
      this.animationItem3 = animationItem;
    }
  }
  animationCreated4(animationItem: AnimationItem): void {
    if (isPlatformBrowser(this.platformID)) {
      this.animationItem4 = animationItem;
    }
  }

  emails: any[] = [];
  listPresidents: any[] = [];
  subject = 'Proposta de Serviços Musicais – Fearless Monkeys';

  message =
    'Exmo. Sr.Presidente {{nome do presidente}} da Câmara Municipal de {{nome da câmara}},\n\nO grupo musical “Fearless Monkeys” vem, por este meio, apresentar-se e manifestar a sua disponibilidade para colaborar em eventos culturais promovidos por V. Exas.\n\nSomos um grupo dedicado à música pop/rock internacional, tendo um vasto repertório de músicas conhecidas e acarinhadas pelas várias faixas etárias. Procuramos contribuir para a dinamização cultural através de performances musicais de qualidade, adaptadas ao contexto e ao público, sendo que somos um grupo com experiência em eventos corporativos, e com a de nos apresentarmos em formato ambulante ou estático para uma atuação em palco.\n\nColocamo-nos à disposição para colaborar na programação de eventos municipais, cerimónias e outras iniciativas que promovam a cultura e a música ao vivo. Caso haja interesse, teremos todo o gosto em apresentar o nosso repertório e condições de atuação.\n\nEm anexo, enviamos mais informações sobre o grupo, incluindo gravações. Para qualquer esclarecimento adicional ou agendamento de reunião, estaremos inteiramente disponíveis.\n\nCom os melhores cumprimentos,\nFearless Monkeys';

  isSignedIn = false;

  constructor(private excelService: ExcelService) {}

  async onFileChange(event: any) {
    const file = event.target.files[0];

    const emailMessages: any[] = [];
    if (file) {
      this.listPresidents = await this.excelService.readExcel(file);

      this.listPresidents.forEach((president) => {
        var message = this.message.replace(
          '{{nome do presidente}}',
          president.presidentName
        );
        message = this.message.replace('{{nome da câmara}}', president.city);
        emailMessages.push({
          message,
          copied: false,
        });
      });
      this.emails = emailMessages;
    }
  }

  copyText(element: any) {
    const text = element.message;
    element.copied = true;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.wasCopied.set(true);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
