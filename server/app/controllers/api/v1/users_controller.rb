module Api
    module V1
        class UsersController < BaseController
            def create
                render json: { lol: true }
            end
        end
    end
end
