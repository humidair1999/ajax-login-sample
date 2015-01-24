module Api
    module V1
        class SessionsController < BaseController
            def seed
                seed = Seed.create(value: SecureRandom.hex)

                render json: { seed: seed.value }
            end

            def create
                seed_value = params['seed']
                # hard-code the sha1 for the string 'lol' for testing purposes
                data = '403926033d001b5279df37cbbe5287b7c7c267fa'

                seed = Seed.find_by(value: seed_value)

                if Seed.exists?(seed)
                    # database will contain hashed password

                    digest = OpenSSL::Digest.new('sha1')
                    hmac = OpenSSL::HMAC.hexdigest(digest, seed_value, data)

                    if hmac == params['hash']
                        seed.destroy

                        render json: { hmac: hmac }
                    else
                        head 403, :error => 'Incorrect password'
                    end
                else
                    head 403, :error => 'Invalid unique seed provided'
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