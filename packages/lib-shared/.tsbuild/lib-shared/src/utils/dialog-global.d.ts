export namespace dialog {
    function alert(message: any, title: any): Promise<any>;
    function confirm(message: any, title: any): Promise<any>;
    function prompt(message: any, defaultValue: any, title: any): Promise<any>;
    function info(message: any, title: any): Promise<any>;
    function success(message: any, title: any): Promise<any>;
    function warning(message: any, title: any): Promise<any>;
    function error(message: any, title: any): Promise<any>;
}
