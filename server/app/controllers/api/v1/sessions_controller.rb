module Api
    module V1
        class SessionsController < BaseController
            def seed
                # TODO: generate legit seed
                # TODO: store seed in table in DB
                render json: { seed: 'iuhf487rh2309jd2fbbhbjhb' }
            end

            def create
                render json: { user_id: 45 }
            end

            def update
                render json: { is_user_updated: true }
            end
        end
    end
end