# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create!(email: "admin@app.com",
			password: "hunghung",
			password_confirmation: "hunghung",
			admin: true)
50.times do |n|
	password = "hunghung"
	User.create!(email: "hung#{n}@app.com",
				 password: password,
				 password_confirmation: password)
end

100.times do |n|
	Application.create!(application_name: "App#{n}",
		                description: "OK!")
end

100.times do |n|
	Category.create!(category_name: "Cat#{n}")
end

10.times do |n|
	Company.create!(company_name: "Com#{n}")
end

