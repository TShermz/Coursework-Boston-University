<?php
namespace com\shoes\domain;

/**
 * Defines the attributes and behavior used by 
 * any of our Domain classes.
 * 
 * <p>
 *  <strong>This class is not done.</strong>
 * </p>
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan@bu.edu>
 */

class BaseEntity {

    /**
     * <p>Default constructor</p>
     */
    function __construct() {
    
    }

    /**
     * Returns string representations, as needed.
     * 
     * <p>
     *  <strong>This is up to you on formatting..</strong>
     * </p>
     */
    public function toString() : string {
        return "BaseEntity.abstract.php";
    }

    // @TODO
}

?>