class User < ActiveRecord::Base
    before_save { self.username = username.downcase }

    validates :username, presence: true, length: { minimum: 3, maximum: 30 }, uniqueness: { case_sensitive: false }
    validates :password, presence: true, length: { minimum: 5, maximum: 50 }
end