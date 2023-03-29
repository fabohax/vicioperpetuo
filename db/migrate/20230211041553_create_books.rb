class CreateBooks < ActiveRecord::Migration[7.0]
  def change
    create_table :books do |t|
      t.string :title
      t.text :body
      t.string :author
      t.integer :price
      t.string :gender1
      t.string :gender2
      t.string :gender3
      t.integer :isbn
      t.integer :year
      t.integer :pages
      t.integer :height
      t.integer :width
      t.string :editor

      t.timestamps
    end
  end
end
