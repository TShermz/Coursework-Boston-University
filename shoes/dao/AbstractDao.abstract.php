<?php
namespace com\shoes\dao;

use com\shoes\dao\Connection;
use PDO;
require ( dirname(__DIR__) . "\dao\Connection.interface.php");

/**
 * Defines and implements signatures used for 
 * generalized instances of this base class.
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan@bu.edu>
 */

class AbstractDao implements Connection {

    /**
     * <p>Default constructor</p>
     */
    function __construct() {
    
    }

    /**
     * <p>
     *  Gets a connection to MySQL with the PDO library.
     * </p>
     * 
     * @return Resource An active database connection
     */
    public function getConnection() {
        // $user = $_ENV['DB_USERNAME'];
        // $pswd = $_ENV['DB_PASSWORD'];
        // $host = $_ENV['DB_HOST'];
        // $name = $_ENV['DB_NAME'];
        $user = getenv('DB_USERNAME');
        $pswd = getenv('DB_PASSWORD');
        $host = getenv('DB_HOST');
        $name = getenv('DB_NAME');
        

        $dsn = "mysql:host=$host;dbname=$name;charset=UTF8";

        try {
            $pdo = new PDO($dsn, 
                           $user,$pswd, 
                           [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        } catch (PDOException $pdoException) {
            error_log($pdoException);
            throw new PDOException($pdoException->getMessage(), 
                                   (int)$pdoException->getCode());
        }

        return $pdo;
    }
}

?>