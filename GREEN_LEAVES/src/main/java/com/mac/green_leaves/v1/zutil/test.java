/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mac.green_leaves.v1.zutil;

/**
 *
 * @author hjcha
 */
public class test {

    public static void main(String[] args) {
        System.out.println("*********** M1 *******************");
        m1();
        System.out.println("*********** M2 *******************");
        m2();
    }

    private static final void m1() {
        int c = 0;
        for (int i = 0; i < 6; i++) {
            for (int j = 0; j < 2 * i - 1; j++) {
                System.out.print(((int) Math.pow(2, i - 1 - Math.abs(i - j - 1))) + " ");
                c++;
            }
            System.out.println();
        }
        System.out.println(c + " interations");
    }

    private static final void m2() {
        int result = 1, k;
        int c =0;

        for (int i = 1; i < 6; i++) {
            System.out.print(result + " ");
            for (k = 1; k < i; k++) {
                result = result * 2;
                System.out.print(result + " ");
                c++;
            }

            while (--k != 0) {
                result = result / 2;
                System.out.print(result + " ");
                c++;
            }
            System.out.println();
        }

        System.out.println(c + " interations");
    }
//    private static final void m2() {
//        long startTime = System.currentTimeMillis();
//		int result = 1, k, count=0;
//
//		for(int i=1;i<6;i++)
//		{
//			System.out.print(result + " ");
//			for(k=1; k<i; k++)
//			{
//				result = result*2;
//				System.out.print(result + " ");
//				count++;
//			}
//			while(--k != 0)
//			{
//				result = result/2;
//				System.out.print(result + " ");	
//				count++;	
//			}
//			System.out.println();
//		}
//	long endTime   = System.currentTimeMillis();
//	long totalTime = endTime - startTime;
//        
//        System.out.println(totalTime);
//        System.out.println(count);
//    }

}
