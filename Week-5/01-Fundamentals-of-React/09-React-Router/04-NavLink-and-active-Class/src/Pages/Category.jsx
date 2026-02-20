import phonesDB from './phonesDB'
import { NavLink } from 'react-router-dom'

function Category() {

  return (
    <>
      <h1> iPhones </h1>
      <ul>
        {phonesDB.data.map(({ id, name, price, memory, currency }) => (
          <li key={id} style={{padding: "1rem", listStyle:"none", margin:"1rem", border:"1px solid black"}}>
            <div style={{fontSize:"large"}}>{name} {memory}</div>
            <div>Price: {price} {currency}</div>
            <NavLink to={`/product/${id}`}> View Details </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Category
