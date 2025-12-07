export namespace dialog {
    function alert(message: any, title: any): Promise<void>;
    function confirm(message: any, title: any): Promise<boolean>;
    function prompt(message: any, defaultValue: any, title: any): Promise<string | null>;
    function info(message: any, title: any): Promise<void>;
    function success(message: any, title: any): Promise<void>;
    function warning(message: any, title: any): Promise<void>;
    function error(message: any, title: any): Promise<void>;
}
