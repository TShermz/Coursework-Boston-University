<?php
namespace com\shoes\security;

class OriginControl {
    private $whiteList;

    /**
     * <p>Default constructor</p>
     */
    function __construct() {
        $this->whiteList = [];
    }
}