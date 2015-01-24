module Api
    module V1
        class UsersController < BaseController
            def create
                user = User.new(user_params)

                if user.save
                    render json: { username: user.username }
                else
                    render json: { errors: user.errors }
                end
            end

            private

                def user_params
                    params.require(:user).permit(:username, :password)
                end
        end
    end
end
