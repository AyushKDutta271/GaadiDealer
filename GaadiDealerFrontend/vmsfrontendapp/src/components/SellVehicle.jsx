import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const SellVehicle = () => {

    const [carPlateNo,setCarPlateNo]=useState();
    const [carBrand,setCarBrand]=useState();
    const [state,setState]=useState();
    const [city,setCity]=useState();
    const [carImages,setCarImages]=useState();
    const [carPrice,setCarPrice]=useState();

  

    

    

    const submitHandler=async (e)=>{
        e.preventDefault();
        const fd = new FormData();
        fd.append('carPlateNo',carPlateNo);
        fd.append('carBrand',carBrand);
        fd.append('userId',user.id);
        fd.append('state',state);
        fd.append('city',city);
        fd.append('carImages',carImages);
        fd.append('carPrice',carPrice);

        try{
            await instance.post('/cars/sell',fd);
        }
        catch(err)
        {
            console.error(err);
        }
    }
 
  return (
    <>
        
        <form>
            <div class="mb-3">
                <label for="car-plate" class="form-label">Car Plate No.</label>
                <input type="text" class="form-control" id="car-plate" name='carplateno' value={carPlateNo} onChange={(e)=>setCarPlateNo(e.target.value)} placeholder="Ex: MH121-09-716" />
            </div>

            <div class="mb-3">
                <select name='carbrand' onChange={(e)=>setCarBrand(e.target.value)}>Car Brand</select>
                <option disabled>Select a car brand</option>
                <option value="totyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="mahindra" >Mahindra</option>
                <option value="ford" >Ford</option>
            </div>

             <div class="mb-3">
                <label for="state" class="form-label">State</label>
                <input type="text" class="form-control" id="state" name='state' value={state} onChange={(e)=>setState(e.target.value)} placeholder="Ex: Maharashtra" />
            </div>
            
             <div class="mb-3">
                <label for="city" class="form-label">city</label>
                <input type="text" class="form-control" id="city" name='city' value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Ex: Mumbai" />
            </div>

             <div class="mb-3">
                <label for="car-images" class="form-label">Car Images:</label>
                <input type="file" class="form-control" accept='image/*' id="car-images" name='carimages'  onChange={(e)=>{setCarImages(e.target.files)}} placeholder="Ex: .jpg" />
                <div className='row'>
                    {
                        carImages.map(c=>{
                            return (
                                <div className='col-4-md'>
                                        <img src={`data:image/jpeg;base64,${c.carImages[0]}`} />
                                </div>
                            )
                        })
                    }
                </div>

                <div class="mb-3">
                    <label for="price" class="form-label">Price:</label>
                    <input type="number" class="form-control" id="price" name='carprice' value={carPrice} onChange={(e)=>setCarPrice(e.target.value)} placeholder="Ex: 37000" />
                </div>
                
                <button type='submit' >Submit</button>
            </div>

        </form>
    </>
  )
}

export default SellVehicle