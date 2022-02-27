import Modal from 'react-modal';
import { useState} from 'react';
import React from 'react';
import { Header } from './components/Header';
import { DashBoard } from './components/DashBoard';
import { GlobalStyle } from './styles/global';
import { TransactionTable } from './components/TransactionTable';
import { NewTransactionModal} from './components/Modal';
import { TransactionContext, TransactionsProvider } from './TransactionContext';


Modal.setAppElement('#root')

function App() {

  const [isNewTransactionModal, setisNewTransactionModal] = useState(false);


  


  function HandleOpenModal(){
    setisNewTransactionModal(true);
  }

  function HandleCloseModal(){
    setisNewTransactionModal(false)
  }

  return (
    <TransactionsProvider>
    <Header onOpenNewTransactionModal = {HandleOpenModal}></Header>
    <DashBoard></DashBoard>
    <NewTransactionModal
    isOpen={isNewTransactionModal}
    onRequestClose={HandleCloseModal}
    ></NewTransactionModal>
     <GlobalStyle></GlobalStyle>
     <TransactionTable></TransactionTable>

    </TransactionsProvider>
  );
}

export default App;
