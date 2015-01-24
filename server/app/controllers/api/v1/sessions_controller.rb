module Api
    module V1
        class SessionsController < BaseController
            def seed
                seed = Seed.create(value: SecureRandom.hex)

                render json: { seed: seed.value }
            end

            def create
                user = User.find_by(username: params['username'])

                if User.exists?(user)
                    seed_value = params['seed']

                    seed = Seed.find_by(value: seed_value)

                    if Seed.exists?(seed)
                        digest = OpenSSL::Digest.new('sha1')
                        hmac = OpenSSL::HMAC.hexdigest(digest, seed_value, user.password)

                        if hmac == params['hash']
                            seed.destroy

                            # TODO: assign new session

                            render json: { hmac: hmac }
                        else
                            head 403, :error => 'Incorrect password'
                        end
                    else
                        head 403, :error => 'Invalid unique seed provided'
                    end
                else
                    head 403, :error => 'User not found'
                end
            end

            # TODO: probably don't need this; was used to demonstrate OPTIONS
            #  preflight requests
            def update
                render json: { is_user_updated: true }
            end
        end
    end
end