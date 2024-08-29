import { ChangeDetectorRef, Component, effect, ViewChild } from '@angular/core';
import BaseComponent from '../../base.component';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../../services/profile.service';
import CreditCardDTO from '../../../../dto/credit-card.dto';
import LoadingComponent from '../../../../lib/components/loading/loading.component';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import NoDataComponent from '../../../../lib/components/no-data/no-data.component';
import TransactionCardComponent from '../../../../lib/components/transaction-card/transaction-card.component';
import TransactionDTO from '../../../../dto/transaction.dto';
import { IconButtonComponent } from '../../../../lib/components/buttons/icon-button.component';
import currencyMasker from '../../../../lib/helpers/currency.masker';
import { InputDateComponent } from '../../../../lib/components/form/input-date.component';
import { format } from 'date-fns';
import { InvoiceService } from '../../../../services/invoice.service';
import InvoiceDTO from '../../../../dto/invoice.dto';
import { ModalComponent } from '../../../../lib/components/modals/modal.component';
import { TransactionService } from '../../../../services/transaction.service';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [
        LoadingComponent,
        DatePipe,
        NoDataComponent,
        TransactionCardComponent,
        IconButtonComponent,
        CurrencyPipe,
        InputDateComponent,
        ModalComponent,
        NgClass,
    ],
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.scss',
})
export class InvoiceComponent extends BaseComponent {
    today = new Date();
    isProfileLoading = false;
    creditCard?: CreditCardDTO;
    invoice?: InvoiceDTO;
    selectedTransaction?: TransactionDTO;

    @ViewChild('transactionModal') transactionModal?: ModalComponent;
    @ViewChild('deletedTransactionModal')
    deletedTransactionModal?: ModalComponent;

    constructor(
        readonly changeDetector: ChangeDetectorRef,
        private readonly route: ActivatedRoute,
        readonly profileService: ProfileService,
        private readonly invoiceService: InvoiceService,
        private readonly transactionService: TransactionService
    ) {
        super(changeDetector);

        this.isProfileLoading = profileService.loading;
        effect(() => {
            const creditCardId = this.route.snapshot.paramMap.get('id');
            this.creditCard = profileService
                .profile()
                ?.creditCards.find((c) => c.id === Number(creditCardId));
            this.invoice = this.creditCard?.invoices[0];
            this.isProfileLoading = profileService.loading;
            changeDetector.detectChanges();
        });
    }

    get transactions(): TransactionDTO[] {
        return this.invoice?.transactions ?? [];
    }

    calculateInvoiceTotal() {
        const reduced = this.transactions.reduce(
            (sum, transaction) => sum + Number(transaction.amount),
            0
        );
        return `R$${currencyMasker(reduced.toFixed(2).toString())[0]}`;
    }

    monthChanged(monthAndYear: Date) {
        const formattedMonth = format(monthAndYear, 'MMM').toUpperCase();
        this.today = monthAndYear;

        this.subscribeAndRender(
            this.invoiceService.getInvoices(
                this.creditCard!.id,
                formattedMonth,
                monthAndYear.getFullYear()
            ),
            (invoice) => {
                this.invoice = invoice[0];
            }
        );
    }

    deleteTransaction(deleteAll: boolean) {
        this.subscribeAndRender(
            this.transactionService.delete(
                this.selectedTransaction!.id,
                deleteAll
            ),
            () => {
                this.transactions.splice(
                    this.transactions.indexOf(this.selectedTransaction!),
                    1
                );
                this.selectedTransaction = undefined;
                this.transactionModal?.close();
                this.deletedTransactionModal?.show();
            }
        );
    }
}
