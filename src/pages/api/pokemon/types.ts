import axios, { AxiosError } from "axios";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  try {
    const { data, status } = await axios.get("https://pokeapi.co/api/v2/type");

    return res.status(status).json(data);
  } catch (error) {
    if (error instanceof AxiosError) {
      return res
        .status(error.response?.status || 500)
        .json(error.response?.data);
    }

    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;
