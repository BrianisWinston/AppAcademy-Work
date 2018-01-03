class User < ActiveRecord::Base
  # self.table_name = ''
  validates :name, presence: true
  validates :email, presence: true
end
