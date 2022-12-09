<?php
namespace com\shoes\dao;

use com\shoes\service\AbstractService;
use PDO;
require ( dirname(__DIR__) . "\dao\AbstractDao.abstract.php");

/**
 * Defines the API used for database operations
 * related to the Product Domain entity.
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan@bu.edu>
 */

class ProductDao extends AbstractDao {
    public $output;
    /**
     * <p>Default constructor</p>
     */
    function __construct() {
    }

    /**
     * Gets a product record by its ID
     * 
     * @return Product A product record
     */
    public function getProductBy($id){
        try{
            $pdo = $this->getConnection();

            $sql = "SELECT * FROM `shoes` WHERE `id` = :id ";

            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            $stmt->execute();
            $this->output = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->output;

        } catch(PDOexception $e){
            $output = 'Database error:'.$e->getMessage().'in'.$e->getFile().':'.$e->getLine();
        }        
    }

    /** 
     * Gets all Products
     * 
     * @return Product[] An array of Product records
     */
    public function getProducts() {
        try{
            $pdo = $this->getConnection();

            $sql = 'SELECT * FROM `shoes`';
            $shoes = $pdo->query($sql);
            $this->output = $shoes->fetchAll(PDO::FETCH_ASSOC);

        } catch (PDOexception $e){
            $output = 'Database error:'.$e->getMessage().'in'.$e->getFile().':'.$e->getLine();
        }
    }

    /** 
     * Adds a Product 
     * 
     * @param Product A product to add
     * @return The newly updated Product
    */
    public function addProduct($product) {
        try{
            $pdo = $this->getConnection();
            $name = $product->getName();
            $quantity = $product->getQuantity();

            $sql = "INSERT INTO shoes (name, quantity) VALUES (:name, :quantity)";

            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(":name", $name, PDO::PARAM_STR);
            $stmt->bindValue(":quantity", $quantity, PDO::PARAM_INT);
            $stmt->execute();
            return "New product added.";
        } catch (PDOexception $e){
            $output = 'Database error:'.$e->getMessage().'in'.$e->getFile().':'.$e->getLine();
        }
    }

    /** 
     * Updates a Product 
     * 
     * @param Product A product to update
     * @return The newly updated Product
    */
    public function updateProduct($product){
        try{
            $pdo = $this->getConnection();
            $id = $product->getId();
            $name = $product->getName();
            $quantity = $product->getQuantity();

            $sql = "UPDATE shoes SET id = :id, name = :name, quantity = :quantity WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            $stmt->bindValue(":name", $name, PDO::PARAM_STR);
            $stmt->bindValue(":quantity", $quantity, PDO::PARAM_INT);

            $stmt->execute();

            return "Product ID #$id has been successfully updated";

        } catch (PDOexception $pdo){
            $output = 'Database error:'.$e->getMessage().'in'.$e->getFile().':'.$e->getLine();
        }
    }

    public function deleteProductby($product){
        try{
            $pdo = $this->getConnection();
            $id = $product->getId();

            $sql = "DELETE FROM shoes WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $stmt->bindValue(":id", $id, PDO::PARAM_INT);
            $stmt->execute();

            return "Product ID: #$id has been deleted.";
        } catch(PDOexception $e){
            $output = 'Database error:'.$e->getMessage().'in'.$e->getFile().':'.$e->getLine();
        }
        
    }
}

?>