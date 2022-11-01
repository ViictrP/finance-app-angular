import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import User from '../../../entities/User';
import {UserService} from '../../services/user.service';
import Transaction from '../../../entities/Transaction';
import {Router} from '@angular/router';
import CreditCard from '../../../entities/CreditCard';
import {BaseComponent} from '../BaseComponent';
import {calculateExpensesHelper} from '../../helper/calculateExpenses.helper';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexTheme,
  ApexTitleSubtitle,
  ApexFill, ApexGrid,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  theme: ApexTheme;
  yaxis: ApexYAxis;
  fill: ApexFill;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent extends BaseComponent implements OnInit {
  @ViewChild("chart") chart?: ChartComponent;
  chartOptions: Partial<ChartOptions>;
  user?: User;
  filteredTransactions: Transaction[] = [];
  expensesAmount = 0;

  constructor(private readonly userService: UserService,
              private readonly router: Router,
              detector: ChangeDetectorRef) {
    super(detector);
    this.chartOptions = {
      series: [
        {
          name: "Network",
          data: [
            {
              x: "Jan",
              y: 44
            },
            {
              x: "Fev",
              y: 31
            },
            {
              x: "Mar",
              y: 38
            },
            {
              x: "Abr",
              y: 32
            },
            {
              x: "Mai",
              y: 55
            },
            {
              x: "Jun",
              y: 51
            },
            {
              x: "Jul",
              y: 67
            },
            {
              x: "Ago",
              y: 22
            },
            {
              x: "Set",
              y: 34
            },
            {
              x: "Out",
              y: 11
            },
            {
              x: "Nov",
              y: 4
            },
            {
              x: "Dez",
              y: 15
            },
          ]
        }
      ],
      chart: {
        type: "area",
        height: 250,
        animations: {
          enabled: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      fill: {
        opacity: 0.8,
        type: "pattern",
        pattern: {
          style: "horizontalLines",
          width: 5,
          height: 5,
          strokeWidth: 1
        }
      },
      markers: {
        size: 6,
        colors: ['#18181b'],
        strokeColors: '#0ea5e9',
        strokeWidth: 3,
        hover: {
          size: 9
        }
      },
      title: {
        text: "Network Monitoring"
      },
      tooltip: {
        shared: true
      },
      theme: {
        palette: "palette1"
      },
      grid: {
        show: true,
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: "category"
      },
      yaxis: {
        show: false,
      },
    };
  }

  get transactions(): Transaction[] {
    return this.user!.transactions;
  }

  get creditCards(): CreditCard[] {
    return this.user?.creditCards ?? [];
  }

  ngOnInit(): void {
    this.subscribeAndRender(this.userService.currentUser, (user) => {
      this.user = user;
      this.calculateExpensesAmout();
      this.filteredTransactions = this.user?.transactions ?? [];
    });
  }

  filterTransactions(text: string) {
    if (text) {
      this.filteredTransactions = this.transactions.filter(
        t => t.description.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      this.filteredTransactions = this.transactions;
    }
  }

  goToInvoices(creditCardId: string) {
    this.router.navigate(['/secure/credit-cards', creditCardId]);
  }

  creditCardsTotal: { [key: string]: number } = {};

  private calculateExpensesAmout() {
    const [total, creditCardsTotal] = calculateExpensesHelper((this.user?.transactions || []), this.creditCards);
    this.expensesAmount = total;
    this.creditCardsTotal = creditCardsTotal;
  }

  calculatePercentage(creditCardId: string) {
    return parseFloat(String((this.creditCardsTotal[creditCardId] / this.expensesAmount) * 100)).toFixed(2);
  }
}
