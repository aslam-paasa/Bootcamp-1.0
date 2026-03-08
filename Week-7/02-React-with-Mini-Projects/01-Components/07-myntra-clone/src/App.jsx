import './App.css'

/**
 * 2. Create a Header component
 *    a. Image
 *    b. Hover button with text
 *    c. Search bar
*/
function Header() {
  return (
    <div className='heading'>
      <img className='logo' src="https://th.bing.com/th/id/ODF.oDY-RkuXADEEjq75t-Xq1A?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2" height={60} width={60} alt="logo" />
      
      <div className='option'>
        <button className='option-button'>Men</button>
        <button className='option-button'>Women</button>
        <button className='option-button'>Kids</button>
        <button className='option-button'>Home & Living</button>
        <button className='option-button'>Beauty</button>
        <button className='option-button'>Studio</button>
      </div>

      <input className='search-bar' type="text" placeholder='Search for products, brands and more' />

      <div className='profile'>
        <button className='profile-button'>Profile</button>
        <button className='profile-button'>Wishlist</button> 
        <button className='profile-button'>Bag</button>
      </div>
    </div>
  )
}

/**
 * 1. Create a Card component
 *    a. Dynamic image by props
 *    b. Dynamic text by props
*/

function Card(props) {
  return (
    <div className='card' style={{ border: '2px solid black', padding: '2px' }}>
      <img src={props.image} style={{ borderRadius: '5px', margin: '2px', height: '200px', width: '150px' }} alt="random" />
      <div style={{ textAlign: 'center' }}>
        <h2>{props.cloth}</h2>
        <h1>{props.discount}</h1>
        <h1>Shop Now</h1>
      </div>
    </div>
  )
}


/**
 * 3. Create a Footer component
 *    a. Image
*/
function Footer() {
  return (
    <div className='footer'>
      <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/10/9a7d7fe6-cb25-46a7-89ce-5fad3577ba5a1752150319128-Bank-Strip--3-.gif"  width={1080} height={120} alt="footer" />
    </div>
  )
}


/**
 * Create dummy data for the cards:
 * 1. cloth
 * 2. discount
 * 3. image
*/
const arr = [
  {
    cloth: "T-shirts",
    discount: "40-50% off",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAwfHx0c2hpcnR8ZW58MHx8MHx8fDA%3D"
  },
  {
    cloth: "Jeans",
    discount: "30-40% off",
    image: "https://plus.unsplash.com/premium_photo-1689371953420-b6981e43fa38?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    cloth: "Shirts",
    discount: "20-30% off",
    image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHNoaXJ0fGVufDB8fDB8fHww"
  },
  {
    cloth: "Shoes",
    discount: "10-20% off",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    cloth: "Watches",
    discount: "5-10% off",
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGNofGVufDB8fDB8fHww"
  },
  {
    cloth: "Sunglasses",  
    discount: "2-5% off",
    image: "https://images.unsplash.com/photo-1584036553516-bf83210aa16c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN1bmdsYXNzZXN8ZW58MHx8MHx8fDA%3D"
  },
  {
    cloth: "Hats",
    discount: "1-2% off",
    image: "https://images.unsplash.com/photo-1613069704252-b83699a549b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjc1fHxoYXR8ZW58MHx8MHx8fDA%3D"
  },
  {
    cloth: "Socks",
    discount: "0.5-1% off",
    image: "https://images.unsplash.com/photo-1613151848917-80e67f421fff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHNvY2tzfGVufDB8fDB8fHww"
  } 
]


function App() {

  return (
    <div>

        {/* Header */}
        <Header />


        {/* Body */}
        <div className='card-container' style={{ display: 'flex',flexWrap: 'wrap',gap: '10px' }}> 
          <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/10/f8933bc1-126a-42a4-8deb-bffa95ba8bba1752150181703-FLAT-300-Off-on-1st-Purchase-Strip-----2--1-.jpg" height={120} width={1440} alt="banner" />
          <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/10/0JPLKQou_467c9889e39d40629c970cbc8a2074eb.jpg"  width={1440} height={360} alt="footer" />

          {arr.map((item, index) => ( 
            <Card cloth={item.cloth} discount={item.discount} image={item.image} key={index} />
          ))}
        </div>


        {/* Footer */}
        <Footer />
    </div>
    )
}

export default App
