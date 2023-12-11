
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, HAMMER_LOADER } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperModule, LoadedImage } from 'ngx-image-cropper';
import { HammerModule } from '@angular/platform-browser';
import { HammerGestureConfig, HammerLoader } from '@angular/platform-browser';


declare const Image: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ImageCropperModule,HammerModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  
  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    if (event && event.objectUrl) {
      this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    }
  }
  
  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  ritaglioConfermato = false;
  confirmCrop(): void {
    // Mostra una finestra modale o un messaggio di conferma
    // Quando l'utente conferma il ritaglio, setta il flag a true
    this.ritaglioConfermato = true;
  }
  modifiche: string[] = [];
  saveCroppedImage(): void {
    if (this.ritaglioConfermato && this.croppedImage) {
      // Aggiungi l'immagine ritagliata all'array 'modifiche'
      this.modifiche.push(this.croppedImage); // Assicurati che 'croppedImage' sia di tipo string
    } else {
      // Gestisci il caso in cui il ritaglio non è stato confermato
      console.log("Ritaglio non confermato o nessuna immagine ritagliata.");
    }
  }

  log(){
    console.log(this.modifiche)
  }
}
