export interface Customer {
    id: number;
    name: string;
    phone: string;
    email: string;
    country_id: number;
    country_name: string;
    country_code: string;
}

export interface AddCustomer {
    name?: string | null;
    phone?: string | null;
    email?: string | null;
    country_id?: number | null;
}

export interface Country {
    id: number;
    name: string;
    country_code: string;
}

export interface FilePath {
    name: string;
}

export type sortColumn = 'name' | 'email' | 'country_name';

export interface CustomerSort {
    column: sortColumn;
    dirAsc: boolean;
}

export type themeValues = 'light-theme' | 'dark-theme';

export interface Theme {
    title: string;
    value: themeValues;
}


export interface Login {
    email?: string | null;
    password?: string | null;
}

export interface User {
    token?: string;
    id: number;
    name: string;
    last_name: string;
    email: string;
}

export interface RegisterUser {
    name?: string | null;
    last_name?: string | null;
    email?: string | null;
    password?: string | null;
}
