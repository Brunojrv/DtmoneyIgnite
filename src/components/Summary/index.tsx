import React, {useContext} from 'react';
import logoEntrada from '../../assets/Entradas.svg'
import logoSaida from '../../assets/Saídas.svg'
import Total from '../../assets/total.svg'
import { TransactionContext } from '../../TransactionContext';
import { Container } from "./style";


export function Summary(){

    const {transactions} = useContext(TransactionContext);

    const summary = transactions.reduce((acc, transaction) =>{
        if(transaction.type =='deposit'){
              acc.deposits+=transaction.amount;  
              acc.total+=transaction.amount;
        }else{
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,

    })
    return(
       <Container>
           <div>
               <header>
                   <p>Entradas</p>
                   <img src={logoEntrada} alt="Entradas" />
               </header>

               <strong>
                 {new Intl.NumberFormat('pt-BR',{
                 style: 'currency',
                currency: 'BRL'})
                .format(summary.deposits)}</strong>
           </div>

           <div>
               <header>
                   <p>Saídas</p>
                   <img src={logoSaida} alt="Saídas" />
               </header>

               <strong>- {new Intl.NumberFormat('pt-BR',{
                 style: 'currency',
                currency: 'BRL'})
                .format(summary.withdraws)}</strong>
           </div>

           <div className='total'>
               <header>
                   <p>Total</p>
                   <img src={Total} alt="Total" />
               </header>

               <strong> {new Intl.NumberFormat('pt-BR',{
                 style: 'currency',
                currency: 'BRL'})
                .format(summary.total)}</strong>
           </div>
       </Container>
    );
}