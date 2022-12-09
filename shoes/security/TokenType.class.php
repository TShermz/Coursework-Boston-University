<?php
namespace com\shoes\security;

enum TokenType
{
    case JWT;
    case BEARER;

    /**
     * <p>
     *  Returns a string representation of an enum.
     * </p>
     * @return {string} The value of the enum, as a string
     */
    public function toString(): string
    {
        return match($this) 
        {
            TokenType::JWT => 'JWT',   
            TokenType::BEARER => 'Bearer',   
        };
    }
}

?>