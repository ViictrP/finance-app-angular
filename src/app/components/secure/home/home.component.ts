import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    effect,
    ViewChild,
} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
    AsyncPipe,
    CurrencyPipe,
    DatePipe,
    JsonPipe,
    NgClass,
    NgOptimizedImage,
} from '@angular/common';
import { Router } from '@angular/router';
import UserDTO from '../../../dto/user.dto';
import ProfileDTO from '../../../dto/profile.dto';
import { ProfileService } from '../../../services/profile.service';
import { IconButtonComponent } from '../../../lib/components/buttons/icon-button.component';
import TransactionCardComponent from '../../../lib/components/transaction-card/transaction-card.component';
import ChipComponent from '../../../lib/components/chip/chip.component';
import NoDataComponent from '../../../lib/components/no-data/no-data.component';
import LoadingComponent from '../../../lib/components/loading/loading.component';
import BaseComponent from '../base.component';
import BalanceDTO from '../../../dto/balance.dto';
import { calculateExpensesHelper } from '../../../helper/calculate-expenses.helper';
import { AbsPipe } from '../../../lib/pipes/abs.pipe';
import { ModalComponent } from '../../../lib/components/modals/modal.component';
import TransactionDTO from '../../../dto/transaction.dto';
import { TransactionService } from '../../../services/transaction.service';
import { format } from 'date-fns';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        JsonPipe,
        NgOptimizedImage,
        AsyncPipe,
        CurrencyPipe,
        IconButtonComponent,
        NgClass,
        TransactionCardComponent,
        ChipComponent,
        NoDataComponent,
        LoadingComponent,
        DatePipe,
        AbsPipe,
        ModalComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends BaseComponent {
    isProfileLoading = false;
    user: UserDTO;
    profile: ProfileDTO | null = null;
    today = new Date();
    balance?: BalanceDTO;
    creditCardsTotal: { [key: string | number]: number } = {};
    totalExpensesAmount?: number;
    selectedTransaction?: TransactionDTO;

    @ViewChild('transactionModal') transactionModal?: ModalComponent;
    @ViewChild('deletedTransactionModal')
    deletedTransactionModal?: ModalComponent;

    constructor(
        readonly authService: AuthService,
        private readonly router: Router,
        readonly profileService: ProfileService,
        private readonly transactionService: TransactionService,
        changeDetection: ChangeDetectorRef
    ) {
        super(changeDetection);
        this.user = authService.user;

        this.isProfileLoading = profileService.loading;
        effect(() => {
            this.profile = profileService.profile();
            this.calculateExpensesAmout();
            this.isProfileLoading = profileService.loading;
            changeDetection.detectChanges();
        });
    }

    private calculateExpensesAmout() {
        const lastMonthClosure = this.profile?.monthClosures.find(
            (m) =>
                m.month === format(this.today, 'MMM').toUpperCase() &&
                m.year === this.today.getFullYear()
        );
        const [, , creditCardsTotal, total] = calculateExpensesHelper(
            this.profile!
        );
        this.creditCardsTotal = creditCardsTotal;
        this.totalExpensesAmount = lastMonthClosure?.expenses ?? total;
    }

    get transactions(): TransactionDTO[] {
        return this.profile?.transactions ?? [];
    }

    calculatePercentage(creditCardId: number) {
        return parseFloat(
            String(
                (this.creditCardsTotal[creditCardId] /
                    this.totalExpensesAmount!) *
                    100
            )
        ).toFixed(2);
    }

    getUpOrdown(): number {
        const lastMonthExpensesAmount =
            this.profile?.monthClosures[this.profile?.monthClosures.length - 1];
        if (lastMonthExpensesAmount && this.totalExpensesAmount) {
            return lastMonthExpensesAmount!.expenses - this.totalExpensesAmount;
        }
        return 0;
    }

    async goToBalance() {
        return this.router.navigate(['secure/balance']);
    }

    deleteTransaction() {
        this.subscribeAndRender(
            this.transactionService.delete(this.selectedTransaction!.id, false),
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
