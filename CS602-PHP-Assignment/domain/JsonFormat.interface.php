<?php
namespace com\shoes\domain;

/**
 * Defines the signatures used by Domain classes that 
 * require the use of JSON formatting.
 * 
 * @version 1.0
 * @author Andrew Sheehan <asheehan@bu.edu>
 */


interface JsonFormat 
{
    public function toJson($object);
}