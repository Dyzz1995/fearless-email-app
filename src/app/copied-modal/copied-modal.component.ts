import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-copied-modal',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './copied-modal.component.html',
  styleUrl: './copied-modal.component.scss',
})
export class CopiedModalComponent {
  private platformID = inject(PLATFORM_ID);

  private animationItem4: AnimationItem | undefined;

  options4: AnimationOptions = {
    path: 'PETISCO.json',
    loop: true,
    autoplay: true,
  };

  animationCreated4(animationItem: AnimationItem): void {
    if (isPlatformBrowser(this.platformID)) {
      this.animationItem4 = animationItem;
    }
  }
}
