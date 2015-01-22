module Api
    module V1
        class SessionsController < BaseController
            def seed
                # TODO: generate legit seed
                # TODO: store seed in table in DB
                render json: { seed: 'iuhf487rh2309jd2fbbhbjhb' }
            end
        end
    end
end