import API_KEY from "./ApiKey";
import { useState, useEffect } from "react";
import axios from "axios";

export interface User {
  id: number;
  username: string;
  password: string;
  plants: Plant[];
}

export interface Plant {
  id: number;
  common_name: string;
  cycle: string;
  watering: number;
  sunlight: string;
  default_image: {
    small_url: string;
  } | null;
  description: string;
  userId: number;
  user: User;
  plantDetails: PlantDetail[];
}

export interface PlantDetail {
  id: number;
  plantId: number;
  plant: Plant;
}

const PlantList = () => {
  const [plants, setPlants] = useState<Plant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`https://perenual.com/api/species-list?page=1&key=${API_KEY}`)
      .then((res) => {
        console.log(res.data);
        setPlants(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data || err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <div className="grid grid-cols-3 border-solid border-5">
        {plants !== null &&
          plants.map((plant) => {
            console.log(plant);
            return (
              <div
                className="grid grid-cols-4 border-solid border-5"
                key={plant.id}
              >
                <h2>{plant.id}</h2>
                {plant.default_image !== null && (
                  <img
                    src={plant.default_image.small_url}
                    alt={plant.common_name}
                  />
                )}
                <h4>{plant.common_name}</h4>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PlantList;
