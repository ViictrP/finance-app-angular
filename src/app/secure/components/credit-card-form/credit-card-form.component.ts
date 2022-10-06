import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import User from '../../../entities/User';
import {ActivatedRoute} from '@angular/router';
import CreditCard from '../../../entities/CreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditCardService} from '../../services/credit-card.service';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit, OnDestroy {

  user?: User;
  subs = new Subscription();
  creditCard?: CreditCard;
  form: FormGroup;
  loading = false;
  shouldUpdate = false;
  colorOptions = [
    {value: 'bg-purple-900', label: 'Roxo'},
    {value: 'bg-zinc-900', label: 'Preto'},
    {value: 'bg-blue-500', label: 'Azul'},
    {value: 'bg-orange-500', label: 'Laranja'},
    {value: 'bg-red-500', label: 'Vermelho'},
  ];

  constructor(private readonly userService: UserService,
              private readonly route: ActivatedRoute,
              private readonly formBuilder: FormBuilder,
              private readonly service: CreditCardService,
              private readonly changeDetector: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      number: [null, [Validators.required]],
      invoiceClosingDay: [null, [Validators.required]],
      color: [null, []]
    });
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  get number() {
    return this.form.get('number');
  }

  get invoiceClosingDay() {
    return this.form.get('invoiceClosingDay');
  }

  get color() {
    return this.form.get('color');
  }

  ngOnInit(): void {
    this.subs.add(
      this.userService.currentUser.subscribe(user => {
        this.user = user;
        const id = this.route.snapshot.paramMap.get('id');
        this.creditCard = user?.creditCards?.find(c => c.id === id);

        if (this.creditCard) {
          this.shouldUpdate = true;
          this.form.setValue({
            title: this.creditCard.title,
            description: this.creditCard.description,
            number: this.creditCard.number,
            invoiceClosingDay: this.creditCard.invoiceClosingDay,
            color: this.creditCard.backgroundColor
          });

          this.form.get('invoiceClosingDay')?.disable();
        }
      }),
    );
  }

  saveCreditCard() {
    this.loading = true;
    const {title, description, number, invoiceClosingDay, color} = this.form.value;
    const creditCard: CreditCard = {
      id: this.creditCard?.id ?? '',
      title,
      description,
      number,
      invoiceClosingDay,
      backgroundColor: color,
      invoices: []
    };
    this.service.saveCreditCard(creditCard, this.shouldUpdate)
      .subscribe(() => {
        this.loading = false;
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
