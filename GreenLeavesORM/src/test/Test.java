/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package test;

import org.hibernate.Session;

/**
 *
 * @author Don
 */
public class Test {

    public static void main(String[] args) {
        System.out.println("Hibernate one to one (Annotation)");
        Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();

      session.createQuery(string);
        
        session.getTransaction().commit();
        System.out.println("Done");
    }
}
