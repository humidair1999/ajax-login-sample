module Api
    module V1
        class SessionsController < BaseController
            def seed
                # TODO: store seed in table in DB
                render json: { seed: SecureRandom.hex }
            end

            def create
                # TODO: check if seed is valid in database

                p params

                # database will contain hashed password

                seed = params['seed']
                # hard-code the sha1 for the string 'lol' for testing purposes
                data = '403926033d001b5279df37cbbe5287b7c7c267fa'

                digest = OpenSSL::Digest.new('sha1')
                hmac = OpenSSL::HMAC.hexdigest(digest, seed, 'lol')

                render json: { hmac: hmac }
            end

            # TODO: probably don't need this; was used to demonstrate OPTIONS
            #  preflight requests
            def update
                render json: { is_user_updated: true }
            end
        end
    end
end