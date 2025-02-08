import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    standalone: false
})
export class ButtonComponent {

  @Input() label = '';
  @Input() type = 'button';
  @Input() leftIcon = '';
  @Input() rightIcon = '';
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
