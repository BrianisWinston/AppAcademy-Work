class User < ApplicationRecord
  after_initialize :ensure_session_token

  attr_reader :password
  
  def self.find_by_credentials(email, pw)
    user = self.find_by(email: email)
    return nil if user.nil?
    user.is_password?(pw) ? user : nil
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def password=(pw)
    self.password_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.password_digest).is_password?(pw)
  end


end
