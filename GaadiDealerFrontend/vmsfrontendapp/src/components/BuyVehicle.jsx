import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const BuyVehicle = () => {

  const [brandSearch,setBrandSearch]=useState('');

  const [priceSearch,setPriceSearch]=useState(0);

  const [cars,setCars]=useState([]);

  const [filteredCars,setFilteredCars]=useState([]);
 
  const location=useLocation();

  const navigate =useNavigate();
  useEffect(()=>{
    fetchCars();
    
  },
[location]
)


const fetchCars=async()=>{
  const fetchedCars=await instance.get('/cars/viewVehicles');
  setCars(fetchedCars.data.content);
}
  const submitHandler=(e)=>{
    e.preventDefault();
    const searchedCars=cars.filter(car=>{
      const foundBrand=brandSearch==='' || brandSearch===car.carBrand;
      const foundPrice=priceSearch==='' || priceSearch===car.price;

      return foundBrand && foundPrice;
    });

    setFilteredCars(searchedCars);
  }

  const onViewClick=(carId)=>{
    navigate(`/viewACar/${carId}`)
  }

  return (
    <>
    
        <form>
            
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Brand Search:</label>
                <input type="text" class="form-control" id="exampleFormControlInput2" name='email' value={brandSearch} onChange={(e)=>setBrandSearch(e.target.value)}/>
            </div>
                
            <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">Price Search:</label>
                <input type="number" class="form-control" id="exampleFormControlInput3" name='password' value={priceSearch} onChange={(e)=>setPriceSearch(e.target.value)}/>
            </div>
                    
              <button type='button' onClick={submitHandler}>Apply</button>
        </form>

        {
          filteredCars.length>0?(
           filteredCars.map(car=>{
            <div key={car.id}>
              <div>
                <img src={car.carImage[0]} />
              </div>
              <div>
                <p>Car Brand:{car.carBrand} </p>
                <p>car Plate No.:{car.carPlateNo}</p>
                <p>car price:.{car.carPrice}</p>
              </div>
              <button type='button' onChange={()=>onViewClick(car.id)}>View</button>
            </div> 
           }) 
          ):<h4>No such car found!</h4>
        }
        
    </>
  )
}

export default BuyVehicle