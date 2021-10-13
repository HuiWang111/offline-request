export var RequestMethod;
(function (RequestMethod) {
    RequestMethod[RequestMethod["GET"] = 0] = "GET";
    RequestMethod[RequestMethod["DELETE"] = 1] = "DELETE";
    RequestMethod[RequestMethod["POST"] = 2] = "POST";
    RequestMethod[RequestMethod["PUT"] = 3] = "PUT";
    RequestMethod[RequestMethod["PATCH"] = 4] = "PATCH";
})(RequestMethod || (RequestMethod = {}));
