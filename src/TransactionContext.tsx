import {createContext, useState, useEffect, ReactNode} from 'react';
import { api } from './service/api';


interface Transaction{
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}



interface TransactionInput{
        title: string;
        amount: number;
        type: string;
        category: string;
}

interface TransactionsProviderProps{
    children: ReactNode;
}


interface transactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionContext = createContext<transactionsContextData>({} as transactionsContextData
    
    );




export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() =>{
      api.get('transactions')
      .then(response => setTransactions(response.data.transactions))
    }, []);

   async function createTransaction(transactionInput: TransactionInput){
        
        const response =   await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date(),
        } )
        const { transaction} = response.data;

        setTransactions([

            ...transactions,
            transaction,
        ]);

    }


    return(

       <TransactionContext.Provider value={{ transactions, createTransaction}}>
           {children}
       </TransactionContext.Provider>
    );

}