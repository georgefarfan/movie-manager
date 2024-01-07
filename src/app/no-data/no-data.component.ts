import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faFaceSadCry,
  faFaceSadTear,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss',
})
export class NoDataComponent {
  @Input()
  message: string;
  constructor(private library: FaIconLibrary) {}

  ngOnInit(): void {
    this.library.addIcons(faWarning, faFaceSadCry, faFaceSadTear);
  }
}
