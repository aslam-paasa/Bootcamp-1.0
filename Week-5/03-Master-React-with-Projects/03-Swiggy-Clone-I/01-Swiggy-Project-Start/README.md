## Planning
1. Think of Application Name
2. Build Wireframe of the Application (how does it look)
3. Break the App into 3 components, and each component have multiple sub-component:
   a. Header
      - Logo
      - Nav Items
   b. Body
      - Search
      - RestaurantContainer
        - RestaurantCard
          - Img
          - Name, Rating, Cusine, delivery time
   c. Footer
      - Copyright
      - Links
      - Address
      - Contact

## Development:
1. Build App Component
   a. Build Header
      - Logo Img
      - Nav Items
   b. Build RestaurantCard Component
      - Make card dynamic (pass in props)
      - Props - passing arguments to a function
      - Destructure Props
      - Spread the data in the card
   c. Build Body
      - SearchBar
      - RestaurantContainer:
        - RestaurantCard: Use Map to render cards with dynamic data of restaurants
   d. Build Footer