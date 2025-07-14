# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create some sample posts
Post.create!([
  {
    title: "Mi Primer Post",
    content: "Este es el contenido de mi primer post. ¡Espero que les guste!"
  },
  {
    title: "React con Rails",
    content: "Aprender a integrar React con Rails usando TanStack Router es muy emocionante. Esta combinación nos permite crear aplicaciones modernas con la robustez de Rails en el backend."
  },
  {
    title: "Desarrollo Web Moderno",
    content: "El desarrollo web moderno requiere una combinación de tecnologías frontend y backend. Rails proporciona una base sólida, mientras que React nos da la flexibilidad para crear interfaces de usuario dinámicas."
  }
])

puts "Posts creados exitosamente!"
