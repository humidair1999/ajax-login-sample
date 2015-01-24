class BaseController < ApplicationController
    skip_before_filter :verify_authenticity_token
     
    before_filter :cors_preflight_check
    after_filter :cors_set_access_control_headers

    def options
        if access_allowed?
            head :ok
        else
            head :forbidden
        end
    end

    private

        def access_allowed?
            # allowed_sites = [request.env['HTTP_ORIGIN']] #you might query the DB or something, this is just an example
            # return allowed_sites.include?(request.env['HTTP_ORIGIN'])
            return true
        end

        # TODO: this may not actually be necessary
        def cors_preflight_check
            if request.method == 'OPTIONS'
                headers['Access-Control-Allow-Origin'] = '*'
                headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
                headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
                headers['Access-Control-Max-Age'] = '1728000'
            end
        end
         
        def cors_set_access_control_headers
            headers['Access-Control-Allow-Origin'] = '*'
            headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
            headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
            headers['Access-Control-Max-Age'] = "1728000"
        end
end