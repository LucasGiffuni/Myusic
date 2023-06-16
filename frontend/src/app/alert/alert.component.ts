import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertInterface } from '../interfaces/IAlert';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="alert-component-body" [ngStyle]="{'background-color': this.alert.style}" >
    {{alert.text}}
    </div>
  `,
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() alert!: AlertInterface ;



}
