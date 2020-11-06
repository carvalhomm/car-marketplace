export interface QueryParam {
    sortBy: Sort;
    method: Method; 
}

export type Sort = 'modelo' | 'fabricante' | 'ano' | 'preco' | 'cor';
export type Method = 'asc' | 'desc';