/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.green_leaves.final_payment;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Supervision
 */
public interface GLFinalPaymentRepository 
//        extends JpaRepository<Void, Integer> 
{

    /*
    @Query(value = "select\n"
            + "	t_account_transaction.index_no ,\n"
            + "	t_account_transaction.branch,\n"
            + "	t_account_transaction.date,\n"
            + "	t_account_transaction.`transaction` ,\n"
            + "	t_account_transaction.transaction_type,\n"
            + "	t_account_transaction.`client`,\n"
            + "	t_account_transaction.employee,\n"
            + "	t_account_transaction.description,\n"
            + "	t_account_transaction.account,\n"
            + "	sum(t_account_transaction.debit_amount) as debit_amount,\n"
            + "	sum(t_account_transaction.credit_amount) as credit_amount\n"
            + "from\n"
            + "	t_account_transaction\n"
            + "where \n"
            + "	year(t_account_transaction.date )=:year and\n"
            + "	month(t_account_transaction.date )=:month \n"
            + "GROUP BY \n"
            + "	t_account_transaction.transaction_type", nativeQuery = true)
    public List<TAccountTransaction> getAccountTransaction(@Param("year") String year, @Param("month") String month);

    @Query(value = "select\n"
            + "	t_account_transaction.index_no ,\n"
            + "	t_account_transaction.branch,\n"
            + "	t_account_transaction.date,\n"
            + "	t_account_transaction.`transaction` ,\n"
            + "	t_account_transaction.transaction_type,\n"
            + "	t_account_transaction.`client`,\n"
            + "	t_account_transaction.employee,\n"
            + "	t_account_transaction.description,\n"
            + "	t_account_transaction.account,\n"
            + "	t_account_transaction.debit_amount as debit_amount,\n"
            + "	t_account_transaction.credit_amount as credit_amount\n"
            + "from\n"
            + "	t_account_transaction\n"
            + "where \n"
            + "	year(t_account_transaction.date )=:year and\n"
            + "	month(t_account_transaction.date )=:month and\n"
            + "	t_account_transaction.transaction_type =:transactionType", nativeQuery = true)
    
    public List<TAccountTransaction> getAccountTransactionsFromDescription(@Param("year") String year, @Param("month") String month, @Param("transactionType") Integer typeId);
*/
}
