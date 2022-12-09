<?php
namespace com\shoes\domain;

use com\shoes\domain\JsonFormat;

require ( dirname(__DIR__) . "\domain\BaseEntity.abstract.php");
require ( dirname(__DIR__) . "\domain\JsonFormat.interface.php");

class Product extends BaseEntity implements JsonFormat {
    private $id;
    private $name;
    private $quantity;
   
    /**
     * <p>Default constructor</p>
     */
    function __construct() {
    }

    /**
     * Overrides BaseEntity::toString()
     */
    public function toString() : string {
        return "ID #$this->id: $this->name; has $this->quantity remaining.";
    }

    public function toJson($shoes){
        $output = json_encode($shoes);

        return $output;
    }

    public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getQuantity() {
        return $this->quantity;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setQuantity($quantity) {
        $this->quantity = $quantity;
    }

    
}
?>