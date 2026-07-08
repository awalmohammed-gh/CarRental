import { createContext, useContext, useState } from "react"
import useFetch from "../hooks/useFetch";


const CarRentalContext = createContext();
export const CarRentalProvider = ({children}) => {
  const {data:Cars, error, loading} = useFetch("/Cars")

  const [addCar, setAddCar] = useState([]);
  const [buyList, setBuyList] = useState([]);
  const [rentals, setRentals] = useState([]);
    const [currentState, setCurrentState] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


    const carData = {
      Cars,
      error,
      loading,
      addCar,
      setAddCar,
      rentals,
      setRentals,
      currentState,
      setCurrentState,
      isLoggedIn,
      setIsLoggedIn,
    };

  return (
    <CarRentalContext.Provider value={carData}>
      {children}
    </CarRentalContext.Provider>
  )
}

export const useCarRental = () => useContext(CarRentalContext);