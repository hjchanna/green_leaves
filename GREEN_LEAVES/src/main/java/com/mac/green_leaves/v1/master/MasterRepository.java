/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.master;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hjcha
 */
@Repository
public class MasterRepository<Model> {

    private static final Integer PAGE_SIZE = 100;

    @PersistenceContext
    private EntityManager entityManager;

    private Session getSession() {
        return entityManager.unwrap(Session.class);
    }

    public List<Model> list(String keyword, Integer pageNumber, Integer branch, Class modelClass) {
        Session session = getSession();

        Criteria criteria = session.createCriteria(modelClass);

        if (keyword != null) {
            Field[] fields = modelClass.getDeclaredFields();
            ArrayList<Criterion> criterions = new ArrayList<>();
            for (Field field : fields) {
                if (field.getType().isAssignableFrom(String.class)) {
                    criterions.add(Restrictions.ilike(field.getName(), keyword, MatchMode.ANYWHERE));
                }
            }
            criteria.add(Restrictions.or(criterions.toArray(new Criterion[]{})));
        }

        criteria.add(Restrictions.eq("branch", branch));

        if (pageNumber != null) {
            criteria.setFirstResult(PAGE_SIZE * (pageNumber - 1));
            criteria.setMaxResults(PAGE_SIZE);
        }

        return criteria.list();
    }

    public int totalItems(String keyword, Integer branch, Class modelClass) {
        Session session = getSession();

        Criteria criteria = session.createCriteria(modelClass);
        if (keyword != null) {
            Field[] fields = modelClass.getDeclaredFields();
            ArrayList<Criterion> criterions = new ArrayList<>();
            for (Field field : fields) {
                if (field.getType().isAssignableFrom(String.class)) {
                    criterions.add(Restrictions.ilike(field.getName(), keyword, MatchMode.ANYWHERE));
                }
            }
            criteria.add(Restrictions.or(criterions.toArray(new Criterion[]{})));
        }

        criteria.add(Restrictions.eq("branch", branch));

        criteria.setProjection(Projections.count("indexNo"));
        Integer totalItems = ((Long) criteria.uniqueResult()).intValue();
        return totalItems;
    }

    public int save(Model model) {
        Session session = getSession();
        return (Integer) session.save(model);
    }

    public int delete(Integer indexNo, Class modelClass) {
        Session session = getSession();

        Model model = (Model) session.get(modelClass, indexNo);
        session.delete(model);
        return indexNo;
    }
}
