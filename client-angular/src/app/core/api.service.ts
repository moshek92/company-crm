import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCustomer, Country, Customer, FilePath, Login, Product, RegisterUser, User } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private token = '';

    setToken(value: string) {
        this.token = value;
    }

    constructor(private http: HttpClient) { }

    getCustomersList(): Observable<Array<Customer>> {
        // return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers`);
        return this.GET<Array<Customer>>(`customers`);
    }

    getSortedCustomers(column: string, direction: string): Observable<Array<Customer>> {
        // return this.http.get<Array<Customer>>
        //     (`${environment.serverUrl}/customers?column=${column}&sort=${direction}`);
        return this.GET<Array<Customer>>(`customers?column=${column}&sort=${direction}`);
    }

    exportCustomers(): Observable<FilePath> {
        // return this.http.get<FilePath>(`${environment.serverUrl}/customers/export`);
        return this.GET<FilePath>(`customers/export`);
    }

    findCustomer(searchTerm: string): Observable<Array<Customer>> {
        // return this.http.get<Array<Customer>>(`${environment.serverUrl}/customers/find?search=${searchTerm}`)
        return this.GET<Array<Customer>>(`customers/find?search=${searchTerm}`);
    }

    getCountries(): Observable<Array<Country>> {
        // return this.http.get<Array<Country>>(`${environment.serverUrl}/countries`);
        return this.GET<Array<Country>>(`countries`);
    }

   
    addCustomer(customer: AddCustomer): Observable<Customer> {
        // return this.http.post<Customer>(
        //     `${environment.serverUrl}/customers`,
        //     customer,
        //     { headers: { 'Content-Type': 'application/json' } }
        // )

        return this.POST<Customer>(`customers`, customer);
    }

    login(details: Login): Observable<User> {
        return this.POST<User>(`login`, details);
    }

    register(user: RegisterUser): Observable<User> {
        return this.POST<User>(`register`, user);
    }

    GET<T>(url: string): Observable<T> {
        return this.http.get<T>(
            `${environment.serverUrl}/${url}`,
            { headers: { 'x-auth-token': this.token } }
        )
    }

    POST<T>(url: string, data: object): Observable<T> {
        return this.http.post<T>(
            `${environment.serverUrl}/${url}`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': this.token
                }
            }
        )
    }
}
