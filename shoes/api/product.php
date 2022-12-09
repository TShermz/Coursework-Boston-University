<?php

require ( dirname(__DIR__) . "\handler\Request.class.php");
require ( dirname(__DIR__) . "\domain\Product.domain.php");
require ( dirname(__DIR__) . "\dao\ProductDao.class.php");
require ( dirname(__DIR__) . "\handler\ProductHandler.class.php");
// require ( dirname(__DIR__) . "\security\TokenType.class.php" );
// require ( dirname(__DIR__) . "\security\Authentication.class.php" );

/* @see: https://bit.ly/3BNC5fb  */

use com\shoes\handler\Request;
use com\shoes\security\TokenType;
use com\shoes\security\Authentication;
use com\shoes\dao\ProductDao;
use com\shoes\handler\ProductHandler;
use com\shoes\domain\Product;

/**
 * Route Definitions (examples of common Use Cases)
 * (a) GET  https://cars.com/Product.php       // GETS  all products
 * (b) GET  https://cars.com/Product.php/123   // GET   the product 123
 * (c) POST https://cars.com/Product.php       // POST  new product
 * (d) PATCH https://cars.com/Product.php/123  // PATCH edit existing product
 * (e) DELETE https://cars.com/Product.php/122 // DELETE delete product 123
 * 
 */


$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = $_SERVER['REQUEST_URI'];

//Explode Uri to get ID, if applicable
$request = new Request($requestMethod, $requestUri);

$product = new Product();
$id = $request->getRequestSegments();
$product->setId($id[2] ?? null);

//Methods for MySQL
$productDao = new ProductDao();

//Manage which method to use pending method and ID
$handler = new ProductHandler();
$output = $handler->handleRequest($request, $product, $productDao);

echo $output;




