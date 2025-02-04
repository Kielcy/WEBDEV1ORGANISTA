import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

/** This program will display the coffee menu
 * the price valute of the menu and 
 * display the ordered product valuye in beforeVAT, VAT, totalAmountDue
 * and finally save the file to CoffeeReceipt.txt
 */
public class Receipt {

    static String[] coffeeTypes = {"Espresso", "Latte", "Cappuccino", "Mocha"};
    static double[] coffeePrices = {50.0, 70.0, 65.0, 80.0};

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        String menu = String.format("""
                    ~ Coffee Menu ~
                    1. Espresso - 50.0 PHP
                    2. Latte - 70.0 PHP
                    3. Cappuccino - 65.0 PHP
                    4. Mocha - 80.0 PHP
                    0. Complete Order
                    Please select a coffee (1-4) or 0 to finish:
                    """);

        int[] orderedQuantities = new int[coffeeTypes.length];

        while (true) {
            System.out.print(menu);
            int choice = scanner.nextInt();

            if(choice == 0){
                break;
            } else if (choice < 1 || choice > coffeeTypes.length) {
                System.out.println("Invalid selection. Please choose a valid coffee type.");
                continue;
            }

            System.out.println("Enter the quantity: ");
            int quantity = scanner.nextInt();

            if(quantity <= 0){
                System.out.println("Quantity must be a positive number. Try again.");
                continue;
            }
            orderedQuantities[choice - 1] += quantity;
        }

        double totalAmount = calculateTotalAmount(orderedQuantities);
        double vatAmount = totalAmount * 0.12;
        double finalTotal = totalAmount + vatAmount;
        printReceipt(coffeeTypes, coffeePrices, orderedQuantities);

        System.out.printf("Total before VAT: %.2f\n", totalAmount);
        System.out.printf("VAT (12%%): %.2f\n", vatAmount);
        System.out.printf("Total amount due: %.2f\n", finalTotal);
        System.out.println("------------------------------");

        saveReceiptToFile(orderedQuantities, totalAmount, vatAmount, finalTotal);

        System.out.println("Receipt has been saved to CoffeeReceipt.txt.");
    }

    public static double calculateTotalAmount(int[] quantities) {
        double total = 0;
        for (int i = 0; i < coffeeTypes.length; i++) {
            total += quantities[i] * coffeePrices[i];
        }
        return total;
    }

    public static void printReceipt(String[] names, double[] prices, int[] quantities){
        String header = "~~~~~~ Receipt ~~~~~~";
        String separator = "~~~~~~~~~~~~~~~~~~~~~~~~";
        System.out.println(header);
        for (int i = 0; i < coffeeTypes.length; i++) {
            if (quantities[i] > 0) {
                System.out.printf("%d x %s @ %.2f each = %.2f\n", quantities[i], names[i], prices[i], quantities[i] * prices[i]);
            }
        }
        System.out.println(separator);
    }

    public static void saveReceiptToFile(int[] quantities, double totalAmount, double vatAmount, double finalTotal) {
        try (FileWriter fileWriter = new FileWriter("CoffeeReceipt.txt")) {
            fileWriter.write("~~~~~~ Receipt ~~~~~~~~~\n");
            for (int i = 0; i < coffeeTypes.length; i++) {
                if (quantities[i] > 0) {
                    fileWriter.write(String.format("%d x %s @ %.2f each = %.2f\n", quantities[i], coffeeTypes[i], coffeePrices[i], quantities[i] * coffeePrices[i]));
                }
            }
            fileWriter.write("~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
            fileWriter.write(String.format("Total before VAT: %.2f\n", totalAmount));
            fileWriter.write(String.format("VAT (12%%): %.2f\n", vatAmount));
            fileWriter.write(String.format("Total amount due: %.2f\n", finalTotal));
            fileWriter.write("------------------------------\n");
        } catch (IOException e) {
            System.out.println("Error saving receipt: " + e.getMessage());
        }
    }
}