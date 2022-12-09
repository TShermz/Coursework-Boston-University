<?php
namespace com\shoes\handler;

class Request 
{
    // As of PHP 7.1+ (private class constants)
    private const MIN_URL_SEGMENTS = 1;

    private $requestMethod;
    private $requestUri;
    private $requestSegments;

    /**
     * <p>
     *  The default constructor
     * </p>
     * @param {String} $requestMethod The request method
     * @param {String} $requestUri A request URI
     */
    function __construct($requestMethod, $requestUri)
    {
        $this->requestMethod = $requestMethod;
        $this->requestUri = $requestUri;
       
        try 
        {
            $this->requestSegments = explode("/", $requestUri); 

            if ( count($this->requestSegments) <= self::MIN_URL_SEGMENTS ) 
            {
                $this->requestSegments = [];
                error_log('Request.__construct(): Segments length <= ' . self::MIN_URL_SEGMENTS);
            }

        } 
        catch (Exception $exception) 
        {
            $this->requestSegments = [];
            error_log('Exception in Request.__construct(): ', $exception->getMessage());
        }
    }

    /**
     * <p>
     *  Gets the request method verb.
     * </p>
     * @return {String} The HTTP REQUEST value
     */
    public function getRequestMethod() : string {
        return $this->requestMethod;
    }

    /**
     * Returns the current URL segments.
     * <p>
     *   It knows nothing about what to do with the segments.
     * </p>
     * 
     * @return {array} An index-based array of strings.
     */
    public function getRequestSegments() : array {
        return $this->requestSegments;
    }
}

?>