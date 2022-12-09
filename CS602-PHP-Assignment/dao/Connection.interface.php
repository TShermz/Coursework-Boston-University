<?php
namespace com\shoes\dao;

/**
 * Defines the signatures used for connecting to MySQL.
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan@bu.edu>
 */

interface Connection {
    /**
     * Gets a connection to MySQL
     * @return ResourceLink An active database connection
     */
    public function getConnection();
}

?>