import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import InputComponent from '../../../../lib/components/form/input.component';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import BottonNavInputComponent from '../../../../lib/components/form/botton-nav.input.component';
import BaseComponent from '../../base.component';
import CreditCardService from '../../../../services/credit-card.service';
import { ModalComponent } from '../../../../lib/components/modals/modal.component';
import { ActivatedRoute } from '@angular/router';
import CreditCardDTO from '../../../../dto/credit-card.dto';
import { ProfileService } from '../../../../services/profile.service';
import LoadingComponent from '../../../../lib/components/loading/loading.component';

@Component({
    selector: 'app-credit-cards-form',
    standalone: true,
    imports: [
        InputComponent,
        ReactiveFormsModule,
        NgClass,
        BottonNavInputComponent,
        ModalComponent,
        LoadingComponent,
    ],
    templateUrl: './credit-card-form.component.html',
    styleUrl: './credit-card-form.component.scss',
})
export class CreditCardFormComponent extends BaseComponent {
    @ViewChild('modal') modal?: ModalComponent;
    loadingProfile = false;
    formGroup: FormGroup;
    creditCard?: CreditCardDTO;

    constructor(
        readonly formBuilder: FormBuilder,
        changeDetectorRef: ChangeDetectorRef,
        private readonly creditCardService: CreditCardService,
        activeRoute: ActivatedRoute,
        profileService: ProfileService
    ) {
        super(changeDetectorRef);
        this.formGroup = formBuilder.group({
            title: [null, [Validators.required]],
            description: [null, [Validators.required]],
            number: [null, [Validators.required]],
            invoiceClosingDay: [null, [Validators.required]],
            color: [null, []],
        });

        const creditCardId = activeRoute.snapshot.paramMap.get('id');

        if (creditCardId) {
            this.loadingProfile = profileService.loading;

            effect(() => {
                this.creditCard = profileService
                    .profile()
                    ?.creditCards.find(
                        (creditCard) => creditCard.id === Number(creditCardId)
                    );

                if (this.creditCard) {
                    this.formGroup.setValue({
                        title: this.creditCard.title,
                        description: this.creditCard.description,
                        number: this.creditCard.number,
                        invoiceClosingDay: this.creditCard.invoiceClosingDay,
                        color: {
                            id: this.creditCard.backgroundColor,
                            value: this.creditCard.backgroundColor,
                        },
                    });
                }

                this.loadingProfile = profileService.loading;
            });
        }
    }

    save() {
        const create = this.creditCardService.create({
            ...this.formGroup.value,
            backgroundColor: this.formGroup.value.color.value,
        });

        const update = this.creditCardService.update({
            id: this.creditCard?.id,
            ...this.formGroup.value,
            backgroundColor: this.formGroup.value.color.value,
        });

        this.subscribeAndRender(this.creditCard ? update : create, () => {
            this.modal?.show();
        });
    }
}
