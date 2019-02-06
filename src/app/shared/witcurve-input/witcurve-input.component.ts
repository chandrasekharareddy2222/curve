import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'witcurve-input',
    templateUrl: './witcurve-input.component.html',
    styleUrls: [
        'witcurve-input.scss'
    ]
})
export class WitcurveInputComponent {
    @Input() displayName = 'display name';
    @Input() textWidth;
    @Input() inputWidth;
    @Input() model;
    @Output() inputChanged = new EventEmitter();

    inputChange() {
        this.inputChanged.emit(this.model);
    }
}
