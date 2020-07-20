import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient) {
    this.getListOfCountries();
   }

   @ViewChild('hrzLineChart') hrzLineChart;

   httpHeaders = new HttpHeaders({
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
    "x-rapidapi-key":"YOz9pCE1GFmsh4qfqiwqNs3ZfFmkp1QGIspjsnx6zIEaeQK7VS",
  });

  currentData = {
    confirmed: 14500000,
    recovered: 8130000,
    critical: 1250000,
    deaths: 606000,
  };

  hrzLines: any;
  listOfCountries
  countrySelected: any;
  
  getListOfCountries() {
    const url = 'https://covid-19-data.p.rapidapi.com/help/countries'
    const httpOptions = {
      headers: this.httpHeaders,
      params: {
        "format":"json",
      }
    };

    this.http.get(url, httpOptions)
    .subscribe(data => {
      this.listOfCountries = data;
    });
  }

  getLatestCountryDataByCode(code) {

    const url = 'https://covid-19-data.p.rapidapi.com/country/code'

    const httpOptions = {
      headers: this.httpHeaders,
      params: {
        "format":"json",
        "code": code
      }
    };
  
    this.http.get(url, httpOptions)
    .subscribe(data => {
      this.currentData = data[0];
    });
  }

  chooseCountry() {
    this.getLatestCountryDataByCode(this.countrySelected);
    this.createSimpleLineChart();
  }

  getCountryName(code) {
    return this.listOfCountries.find( x => x.alpha2code === code).name;
  }

  ionViewDidEnter() {
    this.createSimpleLineChart()
  }

  rand() {
    return Math.floor((Math.random() * 10) + 1)
  }

  sampleDataByCountry(code)
  {
  }

  createSimpleLineChart() {
    this.hrzLines = new Chart(this.hrzLineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['11 Apr', '5 May', '29 May', '15 Jun', '28 Jun', '10 Jul', '16 Jul', '21 Jul'],
        datasets: [{
          label: 'Cases in thousands',
          data: [
            this.rand(),
            this.rand(),
            this.rand(), 
            this.rand(),
            this.rand(),
            this.rand(),
            this.rand(),
            this.rand()
          ],
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
