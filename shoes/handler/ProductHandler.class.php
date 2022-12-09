<?php
namespace com\shoes\handler;
require ( dirname(__DIR__) . "\handler\AbstractHandler.class.php");

/**
 * Route Definitions
 * (a) GET  https://cars.com/Product.php       // GETS  all products
 * (b) GET  https://cars.com/Product.php/123   // GET   the product 123
 * (c) POST https://cars.com/Product.php       // POST  new product
 * (d) PATCH https://cars.com/Product.php/123  // PATCH edit existing product
 * (e) DELETE https://cars.com/Product.php/122 // DELETE delete product 123
 * 
 */

class ProductHandler extends AbstractHandler {

    /**
     * <p>
     *  Default constructor
     * </p>
     */
    function __construct() {
 
    }

    function handleRequest($request, $product, $productDao) {
        switch($request->getRequestMethod()){
            case "DELETE":
                return $productDao->deleteProductby($product);
                break;
            case "PATCH":
                $data = (array) json_decode(file_get_contents("php://input"), true);
                $product->setName($data["name"]);
                $product->setQuantity($data["quantity"]);
                return $productDao-> updateProduct($product);
                break;
            case "GET"&&is_numeric($product->getId()):
                $productDao->getProductBy($product->getId());
                return $product->toJson($productDao->output);
                break;
            case "GET":
                $productDao->getProducts();
                return $product->toJson($productDao->output);
                break;
            case "POST":
                $product->setName($_POST['name']);
                $product->setQuantity($_POST['quantity']);
                return $productDao-> addProduct($product);
                break;
            default:
                return "Invalid input; please try again.";
        }

    }
}

?>