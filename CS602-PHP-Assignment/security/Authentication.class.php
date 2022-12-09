<?php
namespace com\shoes\security;

/**
 * This class is the primary guard for 
 * Authentication.
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan.bu.edu>
 */
class Authentication {

    /**
     * <p>Default constructor</p>
     */
    function __construct() {
        // any attribute initialization?   
        // Goes here...
    }

    /**
     * Only indicated test values to mock up its use.
     * @TODO
     */
    public function generateToken(TokenType $tokenType) : string {
        switch ($tokenType) {
            case TokenType::JWT:
                return "490qkmvasdkfa.023lkajdf.023jdf";
                break;
            case TokenType::BEARER:
                return "23c";
                break; 
        }
    }
}

?>