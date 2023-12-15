export default (preloader) => (RestClient) => {
    RestClient.use(request => {
        const _end = request.end.bind(request);

        request.end = cb =>{
            preloader && preloader.show();

            return _end((...args)=>{
                preloader && preloader.hide();

                return cb(...args);
            })
        }
    });

    return RestClient
}
