class CreateUserTable < ActiveRecord::Migration[5.1]
  def change
    create_table :user_tables do |t|
      t.string :name, null: false
      t.string :email, null: false
    end
  end
end
