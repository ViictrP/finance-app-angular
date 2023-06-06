import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import User from '../../../entities/User';
import {ActivatedRoute} from '@angular/router';
import CreditCard from '../../../entities/CreditCard';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CreditCardService} from '../../services/credit-card.service';
import {BaseComponent} from '../BaseComponent';
import {ModalComponent} from '../../../lib/components/modal/modal.component';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreditCardFormComponent extends BaseComponent implements OnInit {

  @ViewChild('modal') modal?: ModalComponent;

  user?: User;
  creditCard?: CreditCard;
  form: FormGroup;
  loading = false;
  success = false;
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
              changeDetector: ChangeDetectorRef) {
    super(changeDetector);
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
    this.subscribeAndRender(
      this.userService.currentUser,
      (user) => {
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
        }
      }
    )
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
    this.subscribeAndRender(
      this.service.save(creditCard, this.shouldUpdate),
      () => {
        this.success = true;
        this.modal?.show();
        this.loading = false;
        this.success = false;
      });
  }
}
