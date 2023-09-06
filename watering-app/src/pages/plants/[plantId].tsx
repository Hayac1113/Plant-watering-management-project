import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BaseLayout from "@/components/BaseLayout";

export interface User {
  id: number;
  username: string;
  plants?: Plant[];
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
  plantDetails?: PlantDetail[];
}

export interface PlantDetail {
  id: number;
  plantId: number;
  plant: Plant;
}

const PlantDetail = () => {
  const [plant, setPlant] = useState<Plant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<null | string>(null);

  const router = useRouter();
  const plantIdFromUrl = router.query.plantId;

  useEffect(() => {
    if (token) {
      const getUserData = async () => {
        try {
          const response = await axios.get("http://localhost:3001/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser({
            id: response.data.userId,
            username: response.data.message.split(" ")[3],
            plants: [],
          });
        } catch (error) {
          console.error("Failed to get user:", error);
        }
      };

      getUserData();
    }
  }, [token]);

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token");
    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    if (plantIdFromUrl === undefined) {
      return;
    }

    const getPlantFromApi = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/plants/${plantIdFromUrl}`
        );
        setPlant(response.data);
      } catch (error) {
        console.error("Failed to get the book detail:", error);
      }
    };
    getPlantFromApi();
  }, [plantIdFromUrl]);

  const clickHandler = () => {
    const intPlantId = parseInt(plantIdFromUrl as string);

    if (user && user.id) {
      const initialPageProgress = 0;

      axios
        .post(
          "http://localhost:3001/plantDetails",
          {
            plantId: intPlantId,
            userId: user.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          router.reload();
        })
        .catch((error) => {
          console.error("Error while creating book progress:", error);
        });
    } else {
      console.error("User information is missing");
    }
  };

  if (plant === null) {
    return <p>Searching for plant ...</p>;
  }
  return (
    <BaseLayout>
      <div className="book-detail-container">
        <h2>{plant.common_name}</h2>
        {token && <button onClick={clickHandler}>Start reading book</button>}
      </div>
    </BaseLayout>
  );
};

export default PlantDetail;
