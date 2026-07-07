import { createContext, useContext, useState } from "react"
import useFetch from "../hooks/useFetch";


const CarRentalContext = createContext();
export const CarRentalProvider = ({children}) => {
  const {data:Cars, error, loading} = useFetch("/Cars")

  const [addCar, setAddCar] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [rentals, setRentals] = useState([]);

  console.log(addCar);
  console.log(rentals);

    const carData ={
        Cars,
        error,
        loading,
        addCar, setAddCar,
        rentals, setRentals
    }

  return (
    <CarRentalContext.Provider value={carData}>
      {children}
    </CarRentalContext.Provider>
  )
}

export const useCarRental = () => useContext(CarRentalContext);